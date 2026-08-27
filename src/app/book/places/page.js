import Link from 'next/link';
import { PLACES } from '@/lib/content';

export default function PlacesPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Our Places</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">the map of Dublin, ours</p>
        <h1 className="content-title">Our Places</h1>
        <div className="item-list">
          {PLACES.map(p => (
            <div key={p.name} className="item">
              <span className="item-name">{p.name}</span>
              {p.note && <span className="item-note">{p.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
