import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CHAPTERS } from '@/lib/content';
import { CHAPTER_POSTER_FALLBACKS } from '@/lib/dragons';
import { getChapterPhotos } from '@/lib/chapterPhotos';
import SafeImg from '@/components/SafeImg';
import ChapterCarousel from '@/components/ChapterCarousel';
import NavAvatar from '@/components/NavAvatar';

// No generateStaticParams: NavAvatar reads the session per-request, which
// static generation would otherwise bake in empty forever.
export default function ChapterDetail({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = CHAPTERS.find(c => c.num === num - 1);
  const next = CHAPTERS.find(c => c.num === num + 1);

  // Chapter VII has no photo folder (dragon scene instead, per the plan).
  const { hero, rotation } = num === 7 ? { hero: null, rotation: [] } : getChapterPhotos(num);
  const heroSrcs = [hero, ch.heroImg, CHAPTER_POSTER_FALLBACKS[num]].filter(Boolean);

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Chapter {ch.romanNum}</span>
        <NavAvatar />
      </div>

      <div className="chapter-hero">
        <SafeImg srcs={heroSrcs} alt="" className="chapter-hero-still" />
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

        {rotation.length > 0 && <ChapterCarousel images={rotation} />}

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
