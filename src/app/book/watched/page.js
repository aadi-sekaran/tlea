'use client';
import { useState } from 'react';
import { FILMS, SERIES } from '@/lib/content';
import BackButton from '@/components/BackButton';

export default function Watched() {
  const [tab, setTab] = useState('films');
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Watched together</div>
        <h1 className="section-title">Films &amp; <em>series</em></h1>
        <p className="section-subtitle">— everything we sat through together —</p>

        <div className="watched-tabs">
          <button className={`watched-tab ${tab === 'films' ? 'active' : ''}`} onClick={() => setTab('films')}>Films</button>
          <button className={`watched-tab ${tab === 'series' ? 'active' : ''}`} onClick={() => setTab('series')}>Series</button>
        </div>

        <div className="watched-list active">
          {tab === 'films' ? (
            <>
              {FILMS.map((f, i) => {
                const isHp = typeof f === 'object' && f.hp;
                const name = typeof f === 'object' ? f.name : f;
                return <div key={i} className={`watched-item ${isHp ? 'hp' : ''}`}>{name}</div>;
              })}
              <div className="hp-note">✦ all seven, watched together ✦</div>
            </>
          ) : (
            SERIES.map((s, i) => <div key={i} className="watched-item">{s}</div>)
          )}
        </div>
      </div>
    </section>
  );
}
