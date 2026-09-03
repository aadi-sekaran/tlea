'use client';

import Link from 'next/link';
import styles from '../v35.module.css';
import { CHAPTER_META_V35, HERO_COPY, FEATURED_APOLOGY_COPY } from '@/content/locked-v35';
import { CHAPTERS, PLACES, TRIPS, FILMS, SERIES } from '@/lib/content';

const SONG_TILES = [
  { s: 's1', title: "Sai Pallavi's Intro", sub: 'Amaran', glyph: '♪' },
  { s: 's2', title: 'Hey Minnale', sub: 'Amaran', glyph: '♫' },
  { s: 's3', title: 'Konji Pesida Venaam', sub: 'our song', glyph: '♪' },
  { s: 's4', title: 'Kurumugil', sub: 'romantic', glyph: '♫' },
  { s: 's5', title: 'Kannukkulle', sub: 'dancing', glyph: '♪' },
  { s: 's6', title: 'Nagumo', sub: 'recent', glyph: '♫' },
  { s: 's7', title: 'Kannal Pesum', sub: 'the apology', glyph: '♪' },
  { s: 's8', title: 'Nenjam Ellam', sub: 'Proby', glyph: '♫' },
  { s: 's9', title: 'Until I Found You', sub: 'first dedication', glyph: '♪' },
  { s: 's10', title: 'Sahana Saral', sub: 'most sung', glyph: '♫' },
  { s: 's11', title: 'Innum Konjam Neram', sub: 'the beach', glyph: '♪' },
  { s: 's12', title: 'Aval', sub: 'apology', glyph: '♫' }
];

const EXTRAS_TILES = [
  { href: '/preview-v35/book/cast', glyph: '✦', titlePre: 'The ', titleEm: 'cast', sub: 'two Ammus' },
  { href: '/preview-v35/book/firsts', glyph: '§', titlePre: 'Firsts & ', titleEm: 'Lasts', sub: 'two columns' },
  { href: '/preview-v35/book/dictionary', glyph: 'A', titlePre: 'Dictionary ', titleEm: 'of us', sub: 'words only we know' },
  { href: '/preview-v35/book/ledger', glyph: '№', titlePre: 'Ledger of ', titleEm: 'Numbers', sub: 'what we counted' },
  { href: '/preview-v35/book/on-this-day', glyph: '◐', titlePre: 'On this ', titleEm: 'day', sub: 'across three years' },
  { href: '/preview-v35/book/quiz', glyph: '?', titlePre: 'A little ', titleEm: 'quiz', sub: 'only we know' },
  { href: '/preview-v35/book/polaroids', glyph: '▢', titlePre: 'The ', titleEm: 'polaroids', sub: 'real ones' },
  { href: '/preview-v35/book/time-capsule', glyph: '✉', titlePre: 'Time ', titleEm: 'capsule', sub: 'Sept 19, 2027' }
];

export default function BrowseHomeV35() {
  const ch1 = CHAPTERS.find(c => c.num === 1);
  const watched = [
    ...FILMS.slice(0, 5).map(f => ({ title: f.name, tag: 'film' })),
    ...SERIES.slice(0, 3).map(s => ({ title: s.name, tag: 'series' }))
  ];

  return (
    <div className={styles.browse}>
      <nav className={styles.nav}>
        <div className={styles['nav-brand']}>Ammu <em>· a book for you</em></div>
        <Link href="/preview-v35/login" className={styles['nav-avatar']}>A</Link>
      </nav>

      <div className={styles.hero}>
        {ch1?.heroImg && <div className={styles['hero-painting']} style={{ backgroundImage: `url(${ch1.heroImg})` }} />}
        <div className={styles['hero-content']}>
          <div className={styles['hero-eyebrow']}>{HERO_COPY.eyebrow}</div>
          <h1 className={styles['hero-title']}>{HERO_COPY.titlePre}<em>{HERO_COPY.titleEm}</em></h1>
          <p className={styles['hero-synopsis']}>{HERO_COPY.synopsis}</p>
          <div className={styles['hero-actions']}>
            <Link href="/preview-v35/book/chapter/1" className={styles['btn-primary']}>{HERO_COPY.readCta}</Link>
            <Link href="/preview-v35/book/foreword" className={styles['btn-secondary']}>{HERO_COPY.forewordCta}</Link>
          </div>
        </div>
      </div>

      <div className={styles.rows}>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>The <em>chapters</em></h3>
            <span className={styles['row-count']}>7 · in order</span>
          </div>
          <div className={styles['row-scroll']}>
            {CHAPTER_META_V35.map(ch => (
              <Link key={ch.num} href={`/preview-v35/book/chapter/${ch.num}`} className={`${styles.tile} ${styles['tile-chapter']} ${styles[`c${ch.num}`]}`}>
                <span className={styles['tile-num']}>{ch.romanNum}</span>
                <div>
                  <div className={styles['tile-title']}>{ch.tileTitlePlain}<em>{ch.tileTitleEm}</em>{ch.tileTitlePost}</div>
                  <div className={styles['tile-date']}>{ch.tileDate}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>Our <em>songs</em></h3>
            <span className={styles['row-count']}>13 · in emotional order</span>
          </div>
          <div className={styles['row-scroll']}>
            {SONG_TILES.map(t => (
              <Link key={t.s} href="/preview-v35/book/songs" className={`${styles.tile} ${styles['tile-song']} ${styles[t.s]}`}>
                <span className={styles['tile-song-glyph']}>{t.glyph}</span>
                <div>
                  <div className={styles['tile-song-title']}>{t.title}</div>
                  <div className={styles['tile-song-sub']}>{t.sub}</div>
                </div>
              </Link>
            ))}
            <Link href="/preview-v35/book/final-song" className={`${styles.tile} ${styles['tile-song']} ${styles.s13}`}>
              <span className={styles['tile-song-glyph']}>♥</span>
              <div>
                <div className={styles['tile-song-title']}>Phir Bhi Tumko</div>
                <div className={styles['tile-song-sub']}>the final one</div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>Places we <em>knew</em></h3>
            <span className={styles['row-count']}>Dublin, mostly</span>
          </div>
          <div className={styles['row-scroll']}>
            {PLACES.slice(0, 6).map((p, i) => (
              <Link key={p.name} href="/preview-v35/book/places" className={`${styles.tile} ${styles['tile-place']}`}>
                <span className={styles['tile-place-stamp']}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className={styles['tile-place-name']}>{p.name}</div>
                  <div className={styles['tile-place-note']}>{p.note}</div>
                </div>
              </Link>
            ))}
            <Link href="/preview-v35/book/places" className={`${styles.tile} ${styles['tile-place']}`}>
              <span className={styles['tile-place-stamp']}>+{PLACES.length - 6}</span>
              <div>
                <div className={styles['tile-place-name']}>and more</div>
                <div className={styles['tile-place-note']}>see all</div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>Trips we <em>took</em></h3>
            <span className={styles['row-count']}>{TRIPS.length} · one still to come</span>
          </div>
          <div className={styles['row-scroll']}>
            {TRIPS.map(t => (
              <Link key={t.name} href="/preview-v35/book/trips" className={`${styles.tile} ${styles['tile-place']} ${t.special ? styles.final : ''}`}>
                <span className={styles['tile-place-stamp']}>{t.special ? '— fin —' : t.dates.split(' ')[0]}</span>
                <div>
                  <div className={styles['tile-place-name']}>{t.name}</div>
                  <div className={styles['tile-place-note']}>{t.dates}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>Watched <em>together</em></h3>
            <span className={styles['row-count']}>films &amp; series</span>
          </div>
          <div className={styles['row-scroll']}>
            {watched.map(w => (
              <Link key={w.title} href="/preview-v35/book/watched" className={`${styles.tile} ${styles['tile-watch']}`}>
                <div className={styles['tile-watch-title']}>{w.title}</div>
                <div className={styles['tile-watch-tag']}>{w.tag}</div>
              </Link>
            ))}
            <Link href="/preview-v35/book/watched" className={`${styles.tile} ${styles['tile-watch']}`}>
              <div className={styles['tile-watch-title']}>+{FILMS.length + SERIES.length - watched.length} more</div>
              <div className={styles['tile-watch-tag']}>see all</div>
            </Link>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles['row-head']}>
            <h3 className={styles['row-title']}>Everything <em>else</em></h3>
            <span className={styles['row-count']}>the extras</span>
          </div>
          <div className={styles['row-scroll']}>
            {EXTRAS_TILES.map(t => (
              <Link key={t.href} href={t.href} className={`${styles.tile} ${styles['tile-extra']}`}>
                <div className={styles['tile-extra-glyph']}>{t.glyph}</div>
                <div>
                  <div className={styles['tile-extra-title']}>{t.titlePre}<em>{t.titleEm}</em></div>
                  <div className={styles['tile-extra-sub']}>{t.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/preview-v35/book/chapter/7" className={styles['featured-apology']}>
          <div className={styles['featured-eyebrow']}>{FEATURED_APOLOGY_COPY.eyebrow}</div>
          <h2 className={styles['featured-title']}>{FEATURED_APOLOGY_COPY.titlePre}<em>{FEATURED_APOLOGY_COPY.titleEm}</em>{FEATURED_APOLOGY_COPY.titlePost}</h2>
          <p className={styles['featured-line']}>{FEATURED_APOLOGY_COPY.line}</p>
        </Link>

      </div>
    </div>
  );
}
