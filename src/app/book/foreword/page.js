import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
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
        </div>
      </div>
    </div>
  );
}
