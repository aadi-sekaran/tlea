'use client';

import { useEffect, useRef, useState } from 'react';

export default function PolaroidLightbox({ polaroids }) {
  const [openIdx, setOpenIdx] = useState(-1);
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);

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

  // Tracks which polaroid is centered in the horizontal scroller, for the
  // "n / total" pagination counter.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number(entry.target.dataset.idx);
          ratios.set(idx, entry.intersectionRatio);
        });
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        setActiveIdx(bestIdx);
      },
      { root: track, rootMargin: '0px -42% 0px -42%', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    itemRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [polaroids.length]);

  return (
    <>
      <p className="polaroids-caption">The little moments that started a big everything. ♡</p>
      <div className="polaroid-carousel" ref={trackRef}>
        {polaroids.map((p, i) => (
          <button
            key={i}
            ref={el => { itemRefs.current[i] = el; }}
            data-idx={i}
            className="polaroid-item"
            onClick={() => setOpenIdx(i)}
            aria-label={`Open polaroid ${i + 1}`}
          >
            <img
              src={p.src}
              alt={p.caption || `Polaroid ${i + 1}`}
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>
      <p className="polaroids-pagination">{activeIdx + 1} / {polaroids.length}</p>
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
            <img
              className="lightbox-img"
              src={polaroids[openIdx].src}
              alt={polaroids[openIdx].caption || `Polaroid ${openIdx + 1}`}
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
