import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import { LAST_APOLOGY } from '@/lib/content';

export default function ApologyPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book/ch/7/read" className="nav-back">← chapter VII</Link>
        <span className="nav-title">The Last Apology</span>
        <NavAvatar />
      </div>
      <div className="reader reader-tint-apology">
        <div className="reader-inner">
          <p className="reader-eyebrow">{LAST_APOLOGY.eyebrow}</p>
          <h1 className="reader-title">{LAST_APOLOGY.title}</h1>
          <div className="reader-body">
            {LAST_APOLOGY.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div style={{ marginTop: '2rem' }}>
            {LAST_APOLOGY.signoff.split('\n').map((line, i) => (
              line ? (
                <p key={i} style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-hand)', fontSize: '1.3rem', color: 'var(--rose)' }}>
                  {line}
                </p>
              ) : null
            ))}
            {LAST_APOLOGY.ps && (
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.75 }}>
                {LAST_APOLOGY.ps}
              </p>
            )}
          </div>

          <div className="chapter-next-prev" style={{ marginTop: '3rem' }}>
            <Link href="/book/ch/7/read" className="chapter-nav-btn">
              ← Ch VII
            </Link>
            <Link href="/book/farewell" className="chapter-nav-btn">
              a farewell letter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
