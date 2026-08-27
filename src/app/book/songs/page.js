import Link from 'next/link';
import { SONGS, SPOTIFY_PLAYLIST, SONGLINK_PLAYLIST } from '@/lib/content';

export default function SongsPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Songs</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">thirteen songs, one for each part</p>
        <h1 className="content-title">Songs</h1>
        <p className="content-intro">
          Each of these has a moment. A single second where I would want you to stop and listen.
          Not because the whole song is not good, but because those seconds are the ones that mean us.
        </p>

        <div className="songs-list" style={{ padding: 0, maxWidth: 'unset' }}>
          {SONGS.map(s => (
            <div key={s.n} className="song-card">
              <div className="song-num">Song {s.n}</div>
              <div className="song-title">
                {s.title}
                {s.timestamp && (
                  <span className="song-timestamp-badge">at {s.timestamp}</span>
                )}
              </div>
              <div className="song-artist">
                {s.from ? `from "${s.from}" · ` : ''}{s.artist}
              </div>
              <p className="song-note">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="playlist-buttons">
          <a href={SPOTIFY_PLAYLIST} target="_blank" rel="noopener noreferrer" className="playlist-btn spotify">
            Listen on Spotify
          </a>
          <a href={SONGLINK_PLAYLIST} target="_blank" rel="noopener noreferrer" className="playlist-btn">
            Or open in your app
          </a>
          <Link href="/book/finalsong" className="playlist-btn">
            → the final song
          </Link>
        </div>
      </div>
    </div>
  );
}
