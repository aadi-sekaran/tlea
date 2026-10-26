'use client';

import { useEffect, useRef, useState } from 'react';

export default function BgMusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const duckedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function play() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    audio.play().then(() => {
      setPlaying(true);
      try { localStorage.setItem('tlea_bgmusic', 'on'); } catch {}
    }).catch(err => {
      console.warn('audio play blocked', err);
    });
  }

  function pause() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    try { localStorage.setItem('tlea_bgmusic', 'off'); } catch {}
  }

  function toggle() {
    if (playing) pause();
    else play();
  }

  // The seal click (opening sequence) starts the music, and any voice note
  // playing/pausing ducks it — muted while a note plays, restored right
  // after, without touching the user's own on/off choice.
  useEffect(() => {
    function onSealOpen() {
      play();
    }
    function onVoiceNote(e) {
      const audio = audioRef.current;
      if (!audio) return;
      if (e.detail?.playing) {
        if (!audio.paused && !audio.muted) {
          duckedRef.current = true;
          audio.muted = true;
        }
      } else if (duckedRef.current) {
        duckedRef.current = false;
        audio.muted = false;
      }
    }
    window.addEventListener('tlea:play-bg-music', onSealOpen);
    window.addEventListener('tlea:voicenote-playing', onVoiceNote);
    return () => {
      window.removeEventListener('tlea:play-bg-music', onSealOpen);
      window.removeEventListener('tlea:voicenote-playing', onVoiceNote);
    };
  }, []);

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
