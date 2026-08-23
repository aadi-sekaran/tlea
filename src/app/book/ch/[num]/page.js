import { CHAPTERS } from '@/lib/content';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CHAPTERS.map(c => ({ num: String(c.num) }));
}

const POSTER_TITLES = ['THE MEETING','FIRSTS','BUILDING','HUSTLE','HALF & HALF','ANYWAY','THE FINAL'];

export default function ChapterDetail({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = num > 1 ? num - 1 : null;
  const next = num < 7 ? num + 1 : null;
  const readTime = ch.isApology ? '3 min read' : '8 min read';

  return (
    <div className="chapter-detail">
      <div className={`chapter-hero palette-${ch.palette}`}>
        <Link href="/book" className="chapter-hero-back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3 L4 7 L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Contents
        </Link>
        <div className="chapter-hero-content">
          <div className="chapter-hero-eyebrow">Chapter {ch.roman}</div>
          <h1 className="chapter-hero-title" dangerouslySetInnerHTML={{ __html: ch.title }} />
          <div className="chapter-hero-meta">{ch.date} · {readTime}</div>
          <Link href={`/book/ch/${num}/read`} className="play-btn">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 2 L14 8 L3 14 Z" /></svg>
            {ch.isApology ? 'Read the apology' : 'Read chapter'}
          </Link>
        </div>
      </div>

      <div className="chapter-detail-body">
        <p className="chapter-synopsis">{ch.synopsis}</p>

        <div className="detail-meta-row">
          <div className="detail-meta-item">
            <div className="detail-meta-label">Date</div>
            <div className="detail-meta-value">{ch.date}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-label">Chapter</div>
            <div className="detail-meta-value">{POSTER_TITLES[num - 1]} · {ch.roman} of VII</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-label">Length</div>
            <div className="detail-meta-value">{ch.isExample ? 'Example prose · full version coming as it is written' : ch.isApology ? 'A short letter' : 'Chapter opening · full prose being written'}</div>
          </div>
        </div>

        <div className="related-row">
          {prev && (
            <Link href={`/book/ch/${prev}`} className="related-card">
              <div className="related-card-eyebrow">← Previous</div>
              <div className="related-card-title">Chapter {CHAPTERS[prev-1].roman}</div>
            </Link>
          )}
          {next && (
            <Link href={`/book/ch/${next}`} className="related-card">
              <div className="related-card-eyebrow">Next →</div>
              <div className="related-card-title">Chapter {CHAPTERS[next-1].roman}</div>
            </Link>
          )}
          {!prev && next && <div />}
          {!next && prev && <div />}
        </div>
      </div>
    </div>
  );
}
