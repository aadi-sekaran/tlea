'use client';

import { useState } from 'react';

// Stylized, non-geographic layout: pins are placed for visual balance
// across a soft illustrated landmass, not real coordinates. Aadi said
// he may send real geography later; until then this is decorative.
const PIN_POSITIONS = [
  { x: 55, y: 205 },  // Apache Pizza (Blackrock)
  { x: 140, y: 85 },  // Boeuf and Frites
  { x: 225, y: 155 }, // Zaytoon
  { x: 305, y: 75 },  // Daata
  { x: 355, y: 215 }, // Bray Beach
  { x: 95, y: 255 },  // Hubert Park
  { x: 35, y: 145 },  // Blackrock Beach
  { x: 185, y: 245 }, // Frascati Shopping Centre
  { x: 265, y: 205 }, // Penneys
  { x: 325, y: 135 }, // Sandyford (OSLO)
  { x: 105, y: 35 },  // Rathfarnham
  { x: 200, y: 55 },  // City Centre
  { x: 275, y: 35 },  // Dundrum
  { x: 150, y: 175 }, // Aldi
  { x: 65, y: 95 },   // Proby House
  { x: 235, y: 275 }, // 26 Woodbine
  { x: 340, y: 35 }   // 18 Potters Hill
];

export default function PlacesMap({ places }) {
  const [active, setActive] = useState(null);
  const current = active !== null ? places[active] : null;

  function select(i) {
    setActive(prev => (prev === i ? null : i));
  }

  return (
    <div className="places-map-wrap">
      <svg viewBox="0 0 400 300" className="places-map-svg" role="img" aria-label="A map of our places">
        <path
          d="M40,60 C15,120 5,200 50,250 C100,292 180,282 250,270 C320,260 375,220 375,150 C375,88 330,38 260,28 C190,16 88,8 40,60 Z"
          className="places-map-land"
        />
        {PIN_POSITIONS.map((pos, i) => {
          const place = places[i];
          if (!place) return null;
          return (
            <g
              key={place.name}
              className={`places-pin ${active === i ? 'active' : ''}`}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => select(i)}
              tabIndex={0}
              role="button"
              aria-label={place.name}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') select(i); }}
            >
              <circle r="10" className="places-pin-dot" />
              <text y="4" textAnchor="middle" className="places-pin-num">{i + 1}</text>
            </g>
          );
        })}
      </svg>

      {current ? (
        <div className="places-map-card">
          <div className="places-map-card-num">#{active + 1}</div>
          <div className="places-map-card-name">{current.name}</div>
          {current.note && <div className="places-map-card-note">{current.note}</div>}
        </div>
      ) : (
        <p className="places-map-hint">Tap a pin to see the place.</p>
      )}
    </div>
  );
}
