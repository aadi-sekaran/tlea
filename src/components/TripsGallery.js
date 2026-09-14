'use client';

import { useState } from 'react';

// Trips grid with caption below each photo, and a click-to-zoom lightbox
// (same interaction as the polaroids page) so the picture gets to be seen big.
export default function TripsGallery({ trips }) {
  const [openIdx, setOpenIdx] = useState(-1);
  const current = openIdx >= 0 ? trips[openIdx] : null;

  return (
    <>
      <div className="trips-grid">
        {trips.map((t, i) => (
          <div key={i} className="trip-tile">
            {t.hasImg ? (
              <button
                className="trip-tile-imgbtn"
                onClick={() => setOpenIdx(i)}
                aria-label={`Open photo: ${t.name}`}
              >
                <img className="trip-tile-img" src={`/trips/${t.img}`} alt={t.name} />
              </button>
            ) : (
              <div className="trip-tile-fallback" />
            )}
            <div className="trip-tile-info">
              <div className="trip-tile-name">{t.name}{t.special && ' ✨'}</div>
              <div className="trip-tile-caption">{t.caption}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`lightbox ${current ? 'open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setOpenIdx(-1); }}
      >
        {current && (
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setOpenIdx(-1)} aria-label="Close">
              close
            </button>
            <img className="lightbox-img" src={`/trips/${current.img}`} alt={current.name} />
            <div className="lightbox-caption">{current.name} — {current.caption}</div>
          </div>
        )}
      </div>
    </>
  );
}
