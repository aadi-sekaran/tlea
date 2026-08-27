'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CHAPTERS, SECTIONS, ON_THIS_DAY } from '@/lib/content';
import { CHAPTER_POSTER_FALLBACKS } from '@/lib/dragons';

export default function BookHome() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIdx(i => (i + 1) % CHAPTERS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;
  const todaysMemory = ON_THIS_DAY.find(m => m.date === todayKey);

  return (
    <div className="book-shell">
      <div className="top-nav">
        <span className="nav-title">The Last Ever Apology, Truly</span>
        <div className="nav-actions">
          <Link href="/book/release" className="nav-back">release</Link>
        </div>
      </div>

      {/* Hero rotator */}
      <div className="hero-rotator">
        {CHAPTERS.map((ch, i) => (
          <div key={ch.num} className={`hero-slide ${i === heroIdx ? 'active' : ''}`}>
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${ch.heroImg || CHAPTER_POSTER_FALLBACKS[ch.num]})`
              }}
            />
            <div className="hero-slide-overlay" />
            <div className="hero-slide-content">
              <div className="hero-slide-chapter">Chapter {ch.romanNum}</div>
              <h1 className="hero-slide-title">{ch.title}</h1>
              <p className="hero-slide-teaser">{ch.teaser}</p>
              <Link href={`/book/ch/${ch.num}`} className="hero-slide-cta">
                Open chapter →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {todaysMemory && (
        <div className="content-page" style={{ paddingBottom: '2rem' }}>
          <div className="otd-today-card">
            <div className="otd-year">on this day, {todaysMemory.year}</div>
            <p className="otd-memory">{todaysMemory.body}</p>
          </div>
        </div>
      )}

      {/* Chapter carousel */}
      <div>
        <p className="section-eyebrow">The chapters</p>
        <div className="chapter-carousel">
          {CHAPTERS.map(ch => (
            <Link key={ch.num} href={`/book/ch/${ch.num}`} className="chapter-poster">
              <div
                className="chapter-poster-bg"
                style={{
                  backgroundImage: `url(${ch.posterImg || CHAPTER_POSTER_FALLBACKS[ch.num]})`
                }}
              />
              <div className="chapter-poster-overlay">
                <div>
                  <div className="chapter-poster-num">CHAPTER {ch.romanNum}</div>
                  <div className="chapter-poster-title">{ch.shortTitle}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Section grid */}
      <div>
        <p className="section-eyebrow">Every corner of us</p>
        <div className="section-grid">
          {SECTIONS.map(s => (
            <Link key={s.slug} href={`/book/${s.slug}`} className="section-tile">
              <div>
                <div className="section-tile-title">{s.title}</div>
                <div className="section-tile-sub">{s.sub}</div>
              </div>
              <div
                className="section-tile-bg-dragon"
                style={{
                  backgroundImage: 'url(/dragons/pack-main.svg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
