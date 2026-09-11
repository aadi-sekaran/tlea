import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { FAREWELL } from '@/lib/content';
import { FAREWELL_SIGNOFF_ART } from '@/lib/dragons';

export default function FarewellPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book/ch/7/read" className="nav-back">← chapter VII</Link>
        <span className="nav-title">A Farewell Letter</span>
        <NavAvatar />
      </div>
      <div className="reader reader-tint-farewell">
        <div className="reader-inner">
          <p className="reader-eyebrow">{FAREWELL.eyebrow}</p>
          <h1 className="reader-title">{FAREWELL.title}</h1>
          <div className="reader-body">
            {FAREWELL.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <SafeImg srcs={FAREWELL_SIGNOFF_ART} alt="" className="farewell-signoff-mark" />

          <div className="chapter-next-prev" style={{ marginTop: '3rem' }}>
            <Link href="/book/ch/7/read" className="chapter-nav-btn">
              ← Ch VII
            </Link>
            <Link href="/book/finalsong" className="chapter-nav-btn">
              the final song →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
