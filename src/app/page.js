'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

export default function CoverPage() {
  const [stage, setStage] = useState('closed'); // closed -> opening -> open
  const letterRef = useRef(null);

  function open() {
    if (stage !== 'closed') return;
    setStage('opening');
  }

  function handleLetterTransitionEnd(e) {
    if (e.target !== letterRef.current) return;
    if (e.propertyName !== 'transform') return;
    if (stage === 'opening') setStage('open');
  }

  return (
    <div className="cover">
      <span className="brand-mark">the last ever apology, truly</span>

      <div className="cover-scene">
        <div
          className={`envelope stage-${stage}`}
          role="button"
          tabIndex={stage === 'closed' ? 0 : -1}
          aria-label="Open the envelope"
          onClick={open}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
        >
          <div className="envelope-body" />
          <div
            className="envelope-letter"
            ref={letterRef}
            onTransitionEnd={handleLetterTransitionEnd}
          >
            <div className="letter-content">
              <p className="eyebrow">a private book, written for one</p>
              <h1 className="cover-title">The Last Ever Apology, Truly</h1>
              <Link href="/login" className="cover-cta" tabIndex={stage === 'open' ? 0 : -1}>
                Enter →
              </Link>
            </div>
          </div>
          <div className="envelope-flap" />
          <div className="envelope-seal">A+K</div>
        </div>

        <p className={`cover-hint ${stage !== 'closed' ? 'is-hidden' : ''}`}>tap the envelope</p>
      </div>
    </div>
  );
}
