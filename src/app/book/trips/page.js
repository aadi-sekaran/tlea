import fs from 'fs';
import path from 'path';
import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import TripsGallery from '@/components/TripsGallery';
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
        <BackToContents />
        <span className="nav-title">Our Trips</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">four before, one to come</p>
        <h1 className="content-title">Our Trips</h1>
        <SafeImg srcs={HEADER_ART.trips} alt="" className="trips-header-art" />

        <TripsGallery trips={TRIPS.map(t => ({ ...t, hasImg: tripImageExists(t.img) }))} />
      </div>
    </div>
  );
}
