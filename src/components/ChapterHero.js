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

export default function ChapterHero({ images, fallback }) {
  const [idx, setIdx] = useState(0);
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
    if (reducedMotion || images.length <= 1) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [reducedMotion, images.length]);

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

  return (
    <div className="chapter-hero-rotator">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`chapter-hero-slide ${i === idx ? 'active' : ''}`}
          style={{
            '--pan-x': `${pans[i].x}%`,
            '--pan-y': `${pans[i].y}%`,
            transitionDuration: `${CROSSFADE_S}s`,
            animationDuration: `${ROTATE_MS / 1000}s`
          }}
        />
      ))}
    </div>
  );
}
