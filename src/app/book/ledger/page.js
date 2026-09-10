import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import { NUMBERS, LEDGER } from '@/lib/content';

export default function LedgerPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">The Ledger</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        {/* asset: public/dragons/01_Main_Pack/main_047.png */}
        <img className="content-header-art" src="/dragons/01_Main_Pack/main_047.png" alt="" />
        <p className="content-eyebrow">the shape of us, in numbers and small acts</p>
        <h1 className="content-title">The Ledger</h1>

        <div className="numbers-band">
          <h2 className="numbers-title">The Numbers</h2>
          <div className="numbers-grid">
            {NUMBERS.map((n, i) => (
              <div key={i} className="number-cell">
                <div className="number-value">{n.value}</div>
                <div className="number-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--rose)', fontSize: '1.4rem' }}>
          Small acts
        </h2>
        <p style={{ color: 'var(--text-soft)', marginBottom: '1.5rem', fontSize: '0.95rem', fontStyle: 'italic' }}>
          Who did what for whom. Not gifts. The receipt of love in daily-life form.
        </p>
        {LEDGER.map((e, i) => (
          <div key={i} className="ledger-entry">
            <div className="ledger-who">
              {e.who}
              <br />
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{e.date}</span>
            </div>
            <div className="ledger-what">{e.what}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
