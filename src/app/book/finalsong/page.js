import Link from 'next/link';
import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import { FINAL_SONG, SPOTIFY_PLAYLIST } from '@/lib/content';

export default function FinalSongPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">The Final Song</span>
        <NavAvatar />
      </div>
      <div className="finalsong">
        <p className="finalsong-eyebrow">{FINAL_SONG.label}</p>
        <h1 className="finalsong-title">{FINAL_SONG.title}</h1>
        {FINAL_SONG.trackId && (
          <iframe
            className="song-embed finalsong-embed"
            src={`https://open.spotify.com/embed/track/${FINAL_SONG.trackId}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`${FINAL_SONG.title} on Spotify`}
          />
        )}
        <div className="finalsong-prose">
          {FINAL_SONG.prose.split('\n\n').map((para, i) => (
            <p key={i} className="finalsong-note">{para}</p>
          ))}
        </div>
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
