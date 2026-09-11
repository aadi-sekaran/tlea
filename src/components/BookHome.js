'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CHAPTERS, SECTIONS, ON_THIS_DAY, FAREWELL } from '@/lib/content';
import { CHAPTER_POSTER_FALLBACKS, SECTION_TILE_ART, TILE_ICON_ART } from '@/lib/dragons';
import ChapterHero from '@/components/ChapterHero';
import SafeImg from '@/components/SafeImg';

export default function BookHome({ chapterPhotos }) {
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
            <ChapterHero
              images={chapterPhotos[ch.num] || []}
              fallback={ch.heroImg || CHAPTER_POSTER_FALLBACKS[ch.num]}
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
              <ChapterHero
                images={chapterPhotos[ch.num] || []}
                fallback={ch.posterImg || CHAPTER_POSTER_FALLBACKS[ch.num]}
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

      {/* Farewell letter — between the Ch VII apology card above and the final song section below */}
      <div className="farewell-feature-wrap">
        <Link href="/book/farewell" className="farewell-feature-card">
          <p className="farewell-feature-eyebrow">Chapter VII+1 · A farewell letter</p>
          <h2 className="farewell-feature-title">{FAREWELL.title}</h2>
          <span className="farewell-feature-cta">Read the letter →</span>
        </Link>
      </div>

      {/* Section grid */}
      <div>
        <p className="section-eyebrow">Every corner of us</p>
        <div className="section-grid">
          {SECTIONS.map(s => (
            <Link key={s.slug} href={`/book/${s.slug}`} className="section-tile">
              <SafeImg
                srcs={TILE_ICON_ART[s.slug]}
                alt=""
                className="section-tile-icon"
              />
              <div>
                <div className="section-tile-title">{s.title}</div>
                <div className="section-tile-sub">{s.sub}</div>
              </div>
              <img
                className="section-tile-bg-dragon"
                src={SECTION_TILE_ART[s.dragon]}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
