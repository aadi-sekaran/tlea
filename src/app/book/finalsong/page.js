import Link from 'next/link';
import { FINAL_SONG, SPOTIFY_PLAYLIST } from '@/lib/content';

export default function FinalSongPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">The Final Song</span>
        <span />
      </div>
      <div className="finalsong">
        <p className="finalsong-eyebrow">{FINAL_SONG.eyebrow}</p>
        <h1 className="finalsong-title">{FINAL_SONG.title}</h1>
        <p className="finalsong-artist">
          {FINAL_SONG.from ? `from "${FINAL_SONG.from}" · ` : ''}{FINAL_SONG.artist}
        </p>
        <p className="finalsong-time">at {FINAL_SONG.timestamp}</p>
        <p className="finalsong-note">{FINAL_SONG.note}</p>
        <div className="finalsong-buttons">
          <a
            href={SPOTIFY_PLAYLIST}
            target="_blank"
            rel="noopener noreferrer"
            className="playlist-btn spotify"
          >
            Play on Spotify
          </a>
          <Link href="/book/songs" className="playlist-btn">
            ← all songs
          </Link>
        </div>
      </div>
    </div>
  );
}
