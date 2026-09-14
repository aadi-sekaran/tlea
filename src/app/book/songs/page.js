import Link from 'next/link';
import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import { SONGS, SPOTIFY_PLAYLIST, SONGLINK_PLAYLIST } from '@/lib/content';

export default function SongsPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">Songs</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        {/* asset: public/dragons/03_Stickers_Pack/stickers_060.png */}
        <img className="content-header-art" src="/dragons/03_Stickers_Pack/stickers_060.png" alt="" />
        <p className="content-eyebrow">eleven songs, one for each part</p>
        <h1 className="content-title">Songs</h1>
        <p className="content-intro">
          Each of these has a moment. A single second where I would want you to stop and listen.
          Not because the whole song is not good, but because those seconds are the ones that mean us.
        </p>

        <div className="songs-list" style={{ padding: 0, maxWidth: 'unset' }}>
          {SONGS.map(s => (
            <div key={s.n} className="song-card">
              <div className="song-title">{s.title}</div>
              {s.from && <div className="song-source">from {s.from}</div>}
              {s.timestamp && <div className="song-timestamp">the moment: {s.timestamp}</div>}
              {s.badge && <span className="song-badge">{s.badge}</span>}
              {s.trackId && (
                <iframe
                  className="song-embed"
                  src={`https://open.spotify.com/embed/track/${s.trackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${s.title} on Spotify`}
                />
              )}
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
