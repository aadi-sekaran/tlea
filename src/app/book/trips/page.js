import Link from 'next/link';
import { TRIPS } from '@/lib/content';

export default function TripsPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Our Trips</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">four before, one to come</p>
        <h1 className="content-title">Our Trips</h1>
        {TRIPS.map((t, i) => (
          <div key={i} className={`trip-card ${t.special ? 'trip-special' : ''}`}>
            <div className="trip-header">
              <div className="trip-name">
                {t.name}
                {t.special && ' ✨'}
              </div>
              <div className="trip-dates">{t.dates}</div>
            </div>
            <div className="trip-body">{t.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
