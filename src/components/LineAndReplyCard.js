'use client';

import { useState } from 'react';

export default function LineAndReplyCard({ exchanges }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!exchanges || exchanges.length === 0) {
    return (
      <div className="center" style={{ padding: '3rem 1rem' }}>
        <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--text-soft)' }}>
          Aadi is still gathering these. Come back later.
        </p>
      </div>
    );
  }

  const current = exchanges[idx];

  function next() {
    setRevealed(false);
    setIdx(i => Math.min(i + 1, exchanges.length - 1));
  }

  function prev() {
    setRevealed(false);
    setIdx(i => Math.max(i - 1, 0));
  }

  return (
    <div className="lineandreply-shell">
      <div className="lar-progress">{idx + 1} of {exchanges.length}</div>
      <div className="lar-date">{current.date}</div>

      <div className={`lar-bubble ${current.line.speaker === 'Aadi' ? 'line' : 'reply'}`}>
        <div className="lar-speaker">{current.line.speaker}</div>
        <div className="lar-text">{current.line.text}</div>
      </div>

      {revealed ? (
        <>
          <div className={`lar-bubble ${current.reply.speaker === 'Aadi' ? 'line' : 'reply'}`}>
            <div className="lar-speaker">{current.reply.speaker}</div>
            <div className="lar-text">{current.reply.text}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {idx > 0 && (
              <button className="lar-next-btn" onClick={prev}>← previous</button>
            )}
            {idx < exchanges.length - 1 ? (
              <button className="lar-next-btn" onClick={next}>next exchange →</button>
            ) : (
              <button
                className="lar-next-btn"
                onClick={() => { setIdx(0); setRevealed(false); }}
              >
                start over
              </button>
            )}
          </div>
        </>
      ) : (
        <button className="lar-reveal-btn" onClick={() => setRevealed(true)}>
          Show what came next
        </button>
      )}
    </div>
  );
}
