import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import { FILMS, SERIES } from '@/lib/content';

export default function WatchedPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">What We Watched</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        {/* asset: public/dragons/01_Main_Pack/main_099.png */}
        <img className="content-header-art" src="/dragons/01_Main_Pack/main_099.png" alt="" />
        <p className="content-eyebrow">films and series we lived inside</p>
        <h1 className="content-title">What We Watched</h1>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--rose)' }}>
          Films
        </h2>
        <div className="item-list">
          {FILMS.map(f => (
            <div key={f.name} className="item">
              <span className="item-name">{f.name}</span>
              {f.note && <span className="item-note">{f.note}</span>}
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--rose)' }}>
          Series
        </h2>
        <div className="item-list">
          {SERIES.map(s => (
            <div key={s.name} className="item">
              <span className="item-name">{s.name}</span>
              {s.note && <span className="item-note">{s.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
