'use client';

import { useEffect, useRef, useState } from 'react';

export default function BgMusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Do not autoplay. Wait for user tap.
    // Restore last choice from localStorage.
    try {
      const stored = localStorage.getItem('tlea_bgmusic');
      if (stored === 'on') {
        // Still need a user gesture to actually start on mobile. We hint but do not force.
      }
    } catch {}
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      try { localStorage.setItem('tlea_bgmusic', 'off'); } catch {}
    } else {
      audio.volume = 0.35;
      audio.loop = true;
      audio.play().then(() => {
        setPlaying(true);
        try { localStorage.setItem('tlea_bgmusic', 'on'); } catch {}
      }).catch(err => {
        console.warn('audio play blocked', err);
      });
    }
  }

  if (!mounted) return null;

  return (
    <>
      <audio ref={audioRef} src="/audio/bg-music.mp3" preload="auto" />
      <button
        className="bg-music-toggle"
        onClick={toggle}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        )}
      </button>
    </>
  );
}
