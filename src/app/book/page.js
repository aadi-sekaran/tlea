'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CHAPTERS } from '@/lib/content';

const POSTER_TITLES = [
  'THE MEETING',
  'FIRSTS',
  'BUILDING',
  'HUSTLE',
  'HALF & HALF',
  'ANYWAY',
  'THE FINAL',
];

const SECTIONS = [
  {
    label: 'THE BOOK',
    cards: [
      { href: '/book/foreword', tint: 'cream', motif: '✉', title: 'The <em>Foreword</em>', sub: 'why this book' },
      { href: '/book/cast', tint: 'lavender', motif: '✦', title: 'The <em>Cast</em>', sub: 'two Ammus' },
    ],
  },
  {
    label: 'THE WORLD',
    cards: [
      { href: '/book/songs', tint: 'blush', motif: '♪', title: 'Thirteen <em>Songs</em>', sub: 'ours, with meanings' },
      { href: '/book/watched', tint: 'butter', motif: '▷', title: 'Watched <em>Together</em>', sub: 'films & series' },
      { href: '/book/places', tint: 'powder', motif: '◉', title: 'Our <em>Places</em>', sub: 'a Dublin map' },
      { href: '/book/trips', tint: 'sage', motif: '✈', title: 'The <em>Trips</em>', sub: 'four we took' },
    ],
  },
  {
    label: 'US, IN PIECES',
    cards: [
      { href: '/book/dictionary', tint: 'lavender', motif: 'A', title: 'Dictionary <em>of us</em>', sub: 'only we know' },
      { href: '/book/firsts', tint: 'peach', motif: '§', title: 'Firsts &amp; <em>Lasts</em>', sub: 'two columns' },
      { href: '/book/ledger', tint: 'cream', motif: '№', title: 'Ledger of <em>Numbers</em>', sub: 'what we counted' },
      { href: '/book/ontd', tint: 'blush', motif: '◐', title: 'On this <em>day</em>', sub: 'across three years' },
      { href: '/book/quiz', tint: 'butter', motif: '?', title: 'A little <em>quiz</em>', sub: 'only we know' },
      { href: '/book/polaroids', tint: 'peach', motif: '▢', title: 'The <em>Polaroids</em>', sub: 'the real ones' },
    ],
  },
  {
    label: 'FOR LATER',
    cards: [
      { href: '/book/timecapsule', tint: 'powder', motif: '✉', title: 'Time <em>Capsule</em>', sub: 'until Sept 19, 2027', badge: 'Sealed' },
      { href: '/book/finalsong', tint: 'rose', motif: '♥', title: 'The Final <em>Song</em>', sub: 'the closing note' },
    ],
  },
];

export default function Contents() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIdx(i => (i + 1) % 7);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const currentHero = CHAPTERS[heroIdx];

  return (
    <section className="contents-screen">
      <div className="contents-inner">

        {/* ─── ROTATING HERO ─── */}
        <div className="hero">
          {CHAPTERS.map((ch, i) => (
            <Link
              key={ch.num}
              href={`/book/ch/${ch.num}`}
              className={`hero-slide palette-${ch.palette} ${i === heroIdx ? 'active' : ''}`}
            >
              <div className="hero-content">
                <div className="hero-eyebrow">Chapter {ch.roman} · {ch.date}</div>
                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: ch.title }} />
                <div className="hero-meta">a chapter from The Last Ever Apology, Truly</div>
                <div className="hero-cta">
                  <span className="hero-cta-play">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 2 L12 7 L3 12 Z" />
                    </svg>
                  </span>
                  Open chapter
                </div>
              </div>
            </Link>
          ))}
          <div className="hero-dots">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === heroIdx ? 'active' : ''}`}
                onClick={() => setHeroIdx(i)}
                aria-label={`Chapter ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ─── CHAPTER POSTER ROW ─── */}
        <div className="row-header">
          <div className="row-title">The Chapters</div>
        </div>
        <div className="chapter-row">
          {CHAPTERS.map((ch, i) => (
            <Link
              key={ch.num}
              href={`/book/ch/${ch.num}`}
              className={`chapter-poster palette-${ch.palette}`}
            >
              <div className="poster-num">{ch.roman}</div>
              <div className="poster-title">{POSTER_TITLES[i]}</div>
            </Link>
          ))}
        </div>

        {/* ─── OTHER SECTIONS (vertical stacked) ─── */}
        <div className="sections-grid">
          {SECTIONS.map(section => (
            <div key={section.label}>
              <div className="row-header">
                <div className="row-title">{section.label}</div>
              </div>
              <div className="section-block">
                {section.cards.map(card => (
                  <Link key={card.href} href={card.href} className={`nav-card tint-${card.tint}`}>
                    <div>
                      <div className="nav-card-motif">{card.motif}</div>
                      <div className="nav-card-title" dangerouslySetInnerHTML={{ __html: card.title }} />
                      {card.badge && <span className="nav-card-badge">{card.badge}</span>}
                    </div>
                    <div className="nav-card-sub">{card.sub}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="contents-footer">
          <div className="contents-footer-note">— when you are ready —</div>
          <Link href="/book/release" className="release-link">letting this go</Link>
        </div>
      </div>
    </section>
  );
}
