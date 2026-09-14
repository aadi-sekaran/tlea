import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { TRIPS } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';

// Server-side check, same pattern as chapterPhotos.js / voiceNotes.js: if the
// file isn't there yet, fall back gracefully instead of a broken <img>.
function tripImageExists(filename) {
  if (!filename) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'trips', filename));
  } catch {
    return false;
  }
}

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

        <div className="trips-grid">
          {TRIPS.map((t, i) => {
            const hasImg = tripImageExists(t.img);
            return (
              <div key={i} className="trip-tile">
                {hasImg ? (
                  <img className="trip-tile-img" src={`/trips/${t.img}`} alt={t.name} />
                ) : (
                  <div className="trip-tile-fallback" />
                )}
                <div className={`trip-tile-overlay ${hasImg ? '' : 'trip-tile-overlay-fallback'}`}>
                  <div className="trip-tile-name">{t.name}{t.special && ' ✨'}</div>
                  <div className="trip-tile-caption">{t.caption}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
