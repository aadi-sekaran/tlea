import Link from 'next/link';
import { notFound } from 'next/navigation';
import NavAvatar from '@/components/NavAvatar';
import SectionDivider from '@/components/SectionDivider';
import { CHAPTERS, APOLOGY } from '@/lib/content';

// No generateStaticParams: NavAvatar reads the session per-request, which
// static generation would otherwise bake in empty forever.
export default function ChapterReader({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = CHAPTERS.find(c => c.num === num - 1);
  const next = CHAPTERS.find(c => c.num === num + 1);
  const isUnwritten = ch.prose.length === 1 && ch.prose[0].includes('is being written');

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
          {isUnwritten ? (
            <div className="empty-state">
              {/* asset: public/dragons/01_Main_Pack/main_001.png */}
              <img className="empty-state-art" src="/dragons/01_Main_Pack/main_001.png" alt="" />
              <p className="empty-state-text">{ch.prose[0]}</p>
            </div>
          ) : (
            <div className="reader-body">
              {ch.prose.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {ch.tobcontinued && (
            <>
              <SectionDivider />
              <div className="reader-tobcontinued">{ch.tobcontinued}</div>
            </>
          )}

          {ch.hasApology && (
            <div className="reveal-note">
              <div className="reveal-note-lead">and then, the apology</div>
              <div style={{ padding: '1rem 0', color: 'var(--brown)' }}>
                {APOLOGY.body.map((p, i) => (
                  <p key={i} style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', lineHeight: '1.7' }}>
                    {p}
                  </p>
                ))}
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.4rem', color: 'var(--rose)', marginTop: '1.5rem' }}>
                  {APOLOGY.signoff}
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.75 }}>
                  {APOLOGY.ps}
                </p>
              </div>
              <Link href="/book/finalsong" className="reveal-note-btn">
                → the final song
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
