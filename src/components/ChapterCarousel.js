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

// The rotating strip of n1.jpg, n2.jpg, ... below a chapter's static Hero.
// Crossfades every 6s with a subtle Ken Burns scale + pan on each slide.
// Only ever renders two <img> elements (the current frame and the
// preloaded next one), not the whole photo set, regardless of how many
// photos the chapter has.
export default function ChapterCarousel({ images }) {
  const [displayIdx, setDisplayIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = e => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !images || images.length <= 1) return;
    const t = setInterval(() => setDisplayIdx(i => (i + 1) % images.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [reducedMotion, images]);

  const pans = useMemo(
    () => (images || []).map((_, i) => PAN_DIRECTIONS[i % PAN_DIRECTIONS.length]),
    [images]
  );

  if (!images || images.length === 0) return null;

  if (reducedMotion) {
    return (
      <div className="chapter-carousel-below">
        <img className="chapter-carousel-still" src={images[0]} alt="" />
      </div>
    );
  }

  const nextIdx = images.length > 1 ? (displayIdx + 1) % images.length : displayIdx;
  const isEven = displayIdx % 2 === 0;
  const slotAIdx = isEven ? displayIdx : nextIdx;
  const slotBIdx = isEven ? nextIdx : displayIdx;

  return (
    <div className="chapter-carousel-below">
      <img
        key="slotA"
        src={images[slotAIdx]}
        alt=""
        loading="eager"
        className={`chapter-carousel-slide ${isEven ? 'active' : ''}`}
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
        className={`chapter-carousel-slide ${!isEven ? 'active' : ''}`}
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
