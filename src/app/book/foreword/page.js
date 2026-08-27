import Link from 'next/link';
import { FOREWORD } from '@/lib/content';

export default function ForewordPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Foreword</span>
        <span />
      </div>
      <div className="reader reader-tint-1">
        <div className="reader-inner">
          <p className="reader-eyebrow">a note before you begin</p>
          <h1 className="reader-title">{FOREWORD.title}</h1>
          <div className="reader-body">
            {FOREWORD.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="reader-signoff">{FOREWORD.signoff}</div>
        </div>
      </div>
    </div>
  );
}
