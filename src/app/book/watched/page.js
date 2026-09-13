import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { FILMS, SERIES } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';
import posters from '@/lib/posters.generated.json';

const TMDB_IMG = 'https://image.tmdb.org/t/p/w342';

// Prefer Aadi's own note when he wrote one; otherwise fall back to TMDB's
// real overview, trimmed to roughly one line. Nothing here is invented.
function oneLiner(entry, poster) {
  if (entry.note) return entry.note;
  if (!poster || !poster.overview) return null;
  const firstSentence = poster.overview.split(/(?<=[.!?])\s/)[0];
  const text = firstSentence.length <= 140 ? firstSentence : `${poster.overview.slice(0, 137)}...`;
  return text;
}

function PosterGrid({ items, kind }) {
  return (
    <div className="watched-grid">
      {items.map(entry => {
        const poster = posters[kind][entry.name];
        const posterUrl = poster && poster.posterPath ? `${TMDB_IMG}${poster.posterPath}` : null;
        const line = oneLiner(entry, poster);
        return (
          <div key={entry.name} className="watched-card">
            <div className="watched-poster">
              <SafeImg
                srcs={posterUrl ? [posterUrl] : []}
                alt={`${entry.name} poster`}
                className="watched-poster-img"
                textFallback={entry.name}
              />
            </div>
            <div className="watched-card-title">{entry.name}</div>
            {line && <div className="watched-card-line">{line}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function WatchedPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">What We Watched</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.watched} alt="" className="content-header-art" />
        <p className="content-eyebrow">films and series we lived inside</p>
        <h1 className="content-title">What We Watched</h1>

        <h2 className="watched-section-title">Films</h2>
        <PosterGrid items={FILMS} kind="films" />

        <h2 className="watched-section-title" style={{ marginTop: '3rem' }}>Series</h2>
        <PosterGrid items={SERIES} kind="series" />
      </div>
    </div>
  );
}
