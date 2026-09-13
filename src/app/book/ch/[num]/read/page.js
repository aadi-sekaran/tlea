import Link from 'next/link';
import { notFound } from 'next/navigation';
import NavAvatar from '@/components/NavAvatar';
import SectionDivider from '@/components/SectionDivider';
import SafeImg from '@/components/SafeImg';
import { CHAPTERS } from '@/lib/content';
import { CHAPTER_MARKS } from '@/lib/dragons';

// No generateStaticParams: NavAvatar reads the session per-request, which
// static generation would otherwise bake in empty forever.
export default function ChapterReader({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = CHAPTERS.find(c => c.num === num - 1);
  const next = CHAPTERS.find(c => c.num === num + 1);
  const isUnwritten = ch.prose.length === 0;

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href={`/book/ch/${num}`} className="nav-back">← chapter</Link>
        <span className="nav-title">Chapter {ch.romanNum}</span>
        <NavAvatar />
      </div>
      <div className={`reader ${ch.tint}`}>
        <div className="reader-inner">
          <p className="reader-eyebrow">chapter {ch.romanNum}</p>
          <h1 className="reader-title">{ch.title}</h1>

          <SafeImg srcs={CHAPTER_MARKS[num] || []} alt="" className="chapter-mark" />

          {isUnwritten ? (
            <div className="empty-state">
              {/* asset: public/dragons/01_Main_Pack/main_001.png */}
              <img className="empty-state-art" src="/dragons/01_Main_Pack/main_001.png" alt="" />
              <p className="empty-state-text">{ch.tobcontinued || 'Coming soon.'}</p>
            </div>
          ) : (
            <div className="reader-body">
              {ch.prose.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {ch.tobcontinued && !isUnwritten && (
            <>
              <SectionDivider />
              <div className="reader-tobcontinued">{ch.tobcontinued}</div>
            </>
          )}

          {!next && (
            <div className="reveal-note">
              <Link href="/book/apology" className="reveal-note-btn">
                → the last apology
              </Link>
            </div>
          )}

          <div className="chapter-next-prev" style={{ marginTop: '3rem' }}>
            {prev ? (
              <Link href={`/book/ch/${prev.num}/read`} className="chapter-nav-btn">
                ← Ch {prev.romanNum}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/book/ch/${next.num}/read`} className="chapter-nav-btn">
                Ch {next.romanNum} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </div>
    </div>
  );
}
