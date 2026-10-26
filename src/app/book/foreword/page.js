import Link from 'next/link';
import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { FOREWORD } from '@/lib/content';

export default function ForewordPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">Foreword</span>
        <NavAvatar />
      </div>
      <div className="reader reader-tint-1">
        <div className="reader-inner">
          <SafeImg
            srcs={['/dragons/03_Stickers_Pack/stickers_011.png']}
            alt=""
            className="reader-header-accent"
          />
          <p className="reader-eyebrow">a note before you begin</p>
          <h1 className="reader-title">{FOREWORD.title}</h1>
          <div className="reader-body">
            {FOREWORD.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="reader-signoff">{FOREWORD.signoff}</div>
          {/* asset: public/dragons/01_Main_Pack/main_007.png (sitting-together pair) */}
          <img
            src="/dragons/01_Main_Pack/main_007.png"
            alt=""
            className="foreword-accent"
          />

          <div className="chapter-next-prev" style={{ marginTop: '3rem' }}>
            <span />
            <Link href="/book/ch/1" className="chapter-nav-btn">
              Chapter I →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
