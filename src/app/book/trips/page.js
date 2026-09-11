import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { TRIPS } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';

export default function TripsPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Our Trips</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">four before, one to come</p>
        <h1 className="content-title">Our Trips</h1>
        <SafeImg srcs={HEADER_ART.trips} alt="" className="trips-header-art" />
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
            {t.special && (
              // asset: public/dragons/03_Stickers_Pack/stickers_030.png (jar of stars, pair curled inside)
              <img
                className="trip-special-art"
                src="/dragons/03_Stickers_Pack/stickers_030.png"
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
