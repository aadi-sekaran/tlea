'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FIRSTS, LASTS } from '@/lib/content';

export default function FirstsPage() {
  const [tab, setTab] = useState('firsts');

  const list = tab === 'firsts' ? FIRSTS : LASTS;

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Firsts & Lasts</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">a timeline of us</p>
        <h1 className="content-title">Firsts & Lasts</h1>

        <div className="fl-tabs">
          <button
            className={`fl-tab ${tab === 'firsts' ? 'active' : ''}`}
            onClick={() => setTab('firsts')}
          >
            Firsts ({FIRSTS.length})
          </button>
          <button
            className={`fl-tab ${tab === 'lasts' ? 'active' : ''}`}
            onClick={() => setTab('lasts')}
          >
            Lasts ({LASTS.length})
          </button>
        </div>

        <div>
          {list.map((entry, i) => (
            <div key={i} className="fl-entry">
              <div className="fl-date">{entry.date}</div>
              <div className="fl-body">{entry.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
