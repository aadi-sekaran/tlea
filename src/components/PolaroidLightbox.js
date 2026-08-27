'use client';

import { useEffect, useState } from 'react';

export default function PolaroidLightbox({ polaroids }) {
  const [openIdx, setOpenIdx] = useState(-1);

  useEffect(() => {
    function onKey(e) {
      if (openIdx < 0) return;
      if (e.key === 'Escape') setOpenIdx(-1);
      if (e.key === 'ArrowRight') setOpenIdx(i => Math.min(i + 1, polaroids.length - 1));
      if (e.key === 'ArrowLeft') setOpenIdx(i => Math.max(i - 1, 0));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, polaroids.length]);

  return (
    <>
      <div className="polaroids-grid">
        {polaroids.map((p, i) => (
          <button
            key={i}
            className="polaroid"
            onClick={() => setOpenIdx(i)}
            aria-label={`Open polaroid ${i + 1}`}
          >
            <div
              className="polaroid-img"
              style={{ backgroundImage: `url(${p.src})` }}
            />
            <div className="polaroid-caption">{p.caption || ''}</div>
          </button>
        ))}
      </div>
      <div
        className={`lightbox ${openIdx >= 0 ? 'open' : ''}`}
        onClick={e => {
          if (e.target === e.currentTarget) setOpenIdx(-1);
        }}
      >
        {openIdx >= 0 && (
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={() => setOpenIdx(-1)}
              aria-label="Close"
            >
              close
            </button>
            {openIdx > 0 && (
              <button
                className="lightbox-nav prev"
                onClick={() => setOpenIdx(i => i - 1)}
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            <div
              className="lightbox-img"
              style={{ backgroundImage: `url(${polaroids[openIdx].src})` }}
            />
            <div className="lightbox-caption">
              {polaroids[openIdx].caption || ''}
            </div>
            {openIdx < polaroids.length - 1 && (
              <button
                className="lightbox-nav next"
                onClick={() => setOpenIdx(i => i + 1)}
                aria-label="Next"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
