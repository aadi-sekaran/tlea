import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CHAPTERS } from '@/lib/content';
import { CHAPTER_POSTER_FALLBACKS } from '@/lib/dragons';

export function generateStaticParams() {
  return CHAPTERS.map(ch => ({ num: String(ch.num) }));
}

export default function ChapterDetail({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = CHAPTERS.find(c => c.num === num - 1);
  const next = CHAPTERS.find(c => c.num === num + 1);

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Chapter {ch.romanNum}</span>
        <span />
      </div>

      <div className="chapter-hero">
        <div
          className="chapter-hero-bg"
          style={{ backgroundImage: `url(${ch.heroImg || CHAPTER_POSTER_FALLBACKS[num]})` }}
        />
        <div className="chapter-hero-overlay" />
        <div className="chapter-hero-content">
          <div className="chapter-hero-num">Chapter {ch.romanNum}</div>
          <h1 className="chapter-hero-title">{ch.title}</h1>
          <p className="chapter-hero-dates">{ch.dates}</p>
          <Link href={`/book/ch/${num}/read`} className="chapter-play">
            ▶ Read chapter
          </Link>
        </div>
      </div>

      <div className="chapter-body">
        <p className="chapter-synopsis">{ch.teaser}</p>

        <div className="chapter-next-prev">
          {prev ? (
            <Link href={`/book/ch/${prev.num}`} className="chapter-nav-btn">
              ← Ch {prev.romanNum}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/book/ch/${next.num}`} className="chapter-nav-btn">
              Ch {next.romanNum} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
