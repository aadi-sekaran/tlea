'use client';

import { useEffect, useMemo, useState } from 'react';

// Deterministic per-image pan directions so server and client render match
// (avoids Math.random() during render / hydration mismatches).
const PAN_DIRECTIONS = [
  { x: 2, y: -2 }, { x: -2, y: 2 }, { x: 2.5, y: 2 }, { x: -2.5, y: -2 },
  { x: 3, y: 0 }, { x: -3, y: 0 }, { x: 0, y: 2.5 }, { x: 0, y: -2.5 }
];

const ROTATE_MS = 6000;
const CROSSFADE_S = 1.2;

// Renders exactly two <img> elements ("slots") no matter how many photos a
// chapter has, ping-ponging which one is on top. The off-screen slot always
// holds the next image so it's preloaded ahead of the crossfade, but nothing
// beyond those two is ever fetched or mounted at once.
// `active=false` skips the rotation entirely and shows one static frame -
// used for the browse-home hero-rotator's non-current chapters, which are
// invisible (opacity 0) but were previously still animating and preloading
// their full photo set for no visible benefit.
export default function ChapterHero({ images, fallback, active = true }) {
  const [displayIdx, setDisplayIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stillIdx] = useState(() => Math.floor(Math.random() * Math.max(images.length, 1)));

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = e => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || images.length <= 1) return;
    const t = setInterval(() => {
      setDisplayIdx(i => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [active, reducedMotion, images.length]);

  const pans = useMemo(
    () => images.map((_, i) => PAN_DIRECTIONS[i % PAN_DIRECTIONS.length]),
    [images]
  );

  if (!images || images.length === 0) {
    return fallback ? (
      <div className="chapter-hero-bg" style={{ backgroundImage: `url(${fallback})` }} />
    ) : null;
  }

  if (reducedMotion) {
    const still = images[stillIdx] || images[0];
    return <img className="chapter-hero-still" src={still} alt="" />;
  }

  if (!active) {
    return <img className="chapter-hero-still" src={images[0]} alt="" loading="lazy" />;
  }

  const nextIdx = images.length > 1 ? (displayIdx + 1) % images.length : displayIdx;
  const isEven = displayIdx % 2 === 0;
  // slotA/slotB are stable elements (fixed keys) so the browser never
  // re-fetches an already-loaded image and CSS opacity transitions apply
  // smoothly when `.active` toggles between them.
  const slotAIdx = isEven ? displayIdx : nextIdx;
  const slotBIdx = isEven ? nextIdx : displayIdx;

  return (
    <div className="chapter-hero-rotator">
      <img
        key="slotA"
        src={images[slotAIdx]}
        alt=""
        loading="eager"
        className={`chapter-hero-slide ${isEven ? 'active' : ''}`}
        style={{
          '--pan-x': `${pans[slotAIdx].x}%`,
          '--pan-y': `${pans[slotAIdx].y}%`,
          transitionDuration: `${CROSSFADE_S}s`,
          animationDuration: `${ROTATE_MS / 1000}s`
        }}
      />
      <img
        key="slotB"
        src={images[slotBIdx]}
        alt=""
        loading="lazy"
        className={`chapter-hero-slide ${!isEven ? 'active' : ''}`}
        style={{
          '--pan-x': `${pans[slotBIdx].x}%`,
          '--pan-y': `${pans[slotBIdx].y}%`,
          transitionDuration: `${CROSSFADE_S}s`,
          animationDuration: `${ROTATE_MS / 1000}s`
        }}
      />
    </div>
  );
}
