import Link from 'next/link';
import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { FAREWELL } from '@/lib/content';
import { FAREWELL_SIGNOFF_ART } from '@/lib/dragons';

export default function FarewellPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">A Farewell Letter</span>
        <NavAvatar />
      </div>
      <div className="reader reader-tint-farewell">
        <div className="reader-inner">
          <SafeImg
            srcs={['/dragons/03_Stickers_Pack/stickers_012.png']}
            alt=""
            className="reader-header-accent"
          />
          <p className="reader-eyebrow">{FAREWELL.eyebrow}</p>
          <h1 className="reader-title">{FAREWELL.title}</h1>
          <div className="reader-body">
            {FAREWELL.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <SafeImg srcs={FAREWELL_SIGNOFF_ART} alt="" className="farewell-signoff-mark" />

          <div className="chapter-next-prev" style={{ marginTop: '3rem' }}>
            <Link href="/book/apology" className="chapter-nav-btn">
              ← the last apology
            </Link>
            <Link href="/book" className="chapter-nav-btn">
              back to the beginning →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
