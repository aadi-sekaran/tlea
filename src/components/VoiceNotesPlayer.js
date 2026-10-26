'use client';

import { useEffect, useState } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Sequential index order on first render (server and client match, so no
// hydration mismatch), then shuffled client-side after mount. "Next" walks
// through that shuffled order; reaching the end reshuffles and starts over,
// so it never repeats a note until every other one has come up.
export default function VoiceNotesPlayer({ notes }) {
  const [order, setOrder] = useState(() => notes.map((_, i) => i));
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setOrder(shuffle(notes.map((_, i) => i)));
    setPos(0);
  }, [notes]);

  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        {/* asset: public/dragons/01_Main_Pack/main_001.png */}
        <img className="empty-state-art" src="/dragons/01_Main_Pack/main_001.png" alt="" />
        <p className="empty-state-text">The voice notes are still being gathered. Come back soon.</p>
      </div>
    );
  }

  const current = notes[order[pos]];

  function next() {
    setPos(p => {
      if (p + 1 >= order.length) {
        setOrder(shuffle(notes.map((_, i) => i)));
        return 0;
      }
      return p + 1;
    });
  }

  function prev() {
    setPos(p => Math.max(0, p - 1));
  }

  return (
    <div className="voicenotes-player">
      <div className="voicenotes-progress">{pos + 1} of {notes.length}</div>
      {current.speaker && <div className="voicenotes-speaker">{current.speaker}</div>}
      <audio
        key={current.src}
        src={current.src}
        controls
        preload="metadata"
        className="voicenotes-audio"
        onPlay={() => window.dispatchEvent(new CustomEvent('tlea:voicenote-playing', { detail: { playing: true } }))}
        onPause={() => window.dispatchEvent(new CustomEvent('tlea:voicenote-playing', { detail: { playing: false } }))}
        onEnded={() => window.dispatchEvent(new CustomEvent('tlea:voicenote-playing', { detail: { playing: false } }))}
      />
      {current.caption && <p className="voicenotes-caption">{current.caption}</p>}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        {pos > 0 && (
          <button className="lar-next-btn" onClick={prev}>← previous</button>
        )}
        <button className="lar-reveal-btn" onClick={next}>next recording →</button>
      </div>
    </div>
  );
}
