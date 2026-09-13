'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const CLIP1_SOURCES = [{ src: '/opening/envelope-open.mp4', type: 'video/mp4' }];
const CLIP2_SOURCES = [{ src: '/opening/letter-transition.mp4', type: 'video/mp4' }];

// Picks a source ourselves instead of relying on sibling <source> fallback:
// once a browser commits to a <source> by its declared type, it does not
// reliably fall back to the next one if that source silently fails to
// decode. This filters obviously-unsupported formats with canPlayType and
// reacts to a genuine 'error' event by trying the next candidate for real.
// If every candidate 404s (assets not uploaded yet), the video is simply
// left without a working src, and the .play() call further down rejects -
// the sequence quietly skips that screen rather than getting stuck.
function attachSources(video, candidates) {
  if (!video || candidates.length === 0) return;
  const maybePlayable = candidates.filter(c => video.canPlayType(c.type) !== '');
  const list = maybePlayable.length ? maybePlayable : candidates;
  let i = 0;
  function tryNext() {
    if (i >= list.length) return;
    video.src = list[i].src;
    i++;
  }
  video.addEventListener('error', tryNext);
  tryNext();
}

export default function OpeningSequence() {
  const router = useRouter();

  const [reducedMotion, setReducedMotion] = useState(false);
  const [screen, setScreen] = useState('landing'); // landing | bridge | picker | success
  const [opening, setOpening] = useState(false);
  const [playingClip1, setPlayingClip1] = useState(false);
  const [bridgeKey, setBridgeKey] = useState(0);

  const [selected, setSelected] = useState(null); // 'dark' | 'light'
  const [birthday, setBirthday] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rowError, setRowError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const clip1Ref = useRef(null);
  const clip2Ref = useRef(null);
  const clip2AttachedRef = useRef(false);
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = e => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    attachSources(clip1Ref.current, CLIP1_SOURCES);
  }, []);

  function openEnvelope() {
    if (opening) return;
    setOpening(true);

    // Start buffering the bridge video only once the user commits to
    // opening, so it never competes with the initial page load.
    if (!clip2AttachedRef.current) {
      clip2AttachedRef.current = true;
      const clip2 = clip2Ref.current;
      if (clip2) {
        clip2.preload = 'auto';
        attachSources(clip2, CLIP2_SOURCES);
      }
    }

    if (reducedMotion) {
      setScreen('picker');
      return;
    }

    setPlayingClip1(true);
    const p = clip1Ref.current?.play();
    if (p) p.catch(() => setScreen('picker'));
  }

  function handleClip1Ended() {
    setScreen('bridge');
    setBridgeKey(k => k + 1);
    if (reducedMotion) {
      setScreen('picker');
      return;
    }
    const p = clip2Ref.current?.play();
    if (p) p.catch(() => setScreen('picker'));
  }

  function handleClip2Ended() {
    setScreen('picker');
  }

  function selectDragon(which) {
    setSelected(which);
    setErrorMsg('');
    setBirthday('');
    setTimeout(() => birthdayInputRef.current?.focus(), 480);
  }

  function triggerError(msg) {
    setShakeKey(k => k + 1);
    setRowError(true);
    setErrorMsg(msg);
    setBirthday('');
    setTimeout(() => birthdayInputRef.current?.focus(), 0);
    setTimeout(() => setRowError(false), 1400);
  }

  async function attemptSubmit() {
    if (!selected || submitting) return;
    if (!birthday) {
      triggerError('Enter the birthday first.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selected, password: birthday })
      });
      const data = await res.json();
      if (data.ok) {
        fetch('/api/login-notify', { method: 'POST' }).catch(() => {});
        runSuccess();
      } else {
        triggerError("That doesn't seem to be the right birthday. Try again.");
      }
    } catch {
      triggerError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function runSuccess() {
    setScreen('success');
    setTimeout(() => {
      router.push('/book');
    }, reducedMotion ? 400 : 2200);
  }

  const hasSelection = selected !== null;

  return (
    <div className="os-root">
      {/* 1. Closed envelope */}
      <section
        id="os-landing"
        className={`os-screen ${screen === 'landing' ? 'active' : ''} ${opening ? 'os-opening' : ''}`}
        aria-label="Envelope opening"
      >
        <div className="os-eyebrow">for you</div>
        <div className="os-stage-wrap os-idle-float">
          <div className={`os-stage ${playingClip1 ? 'os-playing' : ''}`}>
            <img
              className="os-poster"
              src="/opening/envelope-closed.jpg"
              alt="A sealed envelope, watched over by two little dragons."
            />
            <video
              ref={clip1Ref}
              className="os-clip"
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onEnded={handleClip1Ended}
            />
            <button
              type="button"
              className="os-seal-hotspot"
              aria-label="Break the seal to open the letter"
              onClick={openEnvelope}
            />
          </div>
        </div>
        <div className="os-tap-hint">touch the seal</div>
      </section>

      {/* 2. Letter transition / bridge */}
      <section
        id="os-bridge"
        className={`os-screen ${screen === 'bridge' ? 'active' : ''}`}
        aria-label="The letter opens"
      >
        <div className="os-bridge-stage" key={bridgeKey}>
          <video ref={clip2Ref} muted playsInline preload="none" aria-hidden="true" onEnded={handleClip2Ended} />
          <div className="os-bridge-veil" />
        </div>
      </section>

      {/* 3. Choose your Ammu */}
      <section
        id="os-picker"
        className={`os-screen os-picker ${screen === 'picker' ? 'active' : ''} ${hasSelection ? 'os-has-selection' : ''}`}
        aria-label="Choose your Ammu"
      >
        <div className="os-picker-card">
          <h1 className="os-picker-title">Choose your Ammu</h1>
          <p className="os-picker-sub">and enter the other one&apos;s birthday</p>

          <div className="os-avatars">
            <button
              className="os-avatar-btn"
              type="button"
              aria-pressed={selected === 'dark'}
              onClick={() => selectDragon('dark')}
            >
              <span className="os-avatar-circle">
                <img src="/images/dragons/dark-dragon.jpg" alt="Aadi's dragon" />
              </span>
              <span className="os-avatar-name">Ammu</span>
              <span className="os-avatar-confirm">Your Ammu</span>
            </button>
            <button
              className="os-avatar-btn"
              type="button"
              aria-pressed={selected === 'light'}
              onClick={() => selectDragon('light')}
            >
              <span className="os-avatar-circle">
                <img src="/images/dragons/white-dragon.jpg" alt="Krithika's dragon" />
              </span>
              <span className="os-avatar-name">Ammu</span>
              <span className="os-avatar-confirm">Your Ammu</span>
            </button>
          </div>

          <div className="os-birthday-section">
            <p className="os-birthday-prompt">Now enter the other one&apos;s birthday.</p>
            <div
              key={shakeKey}
              className={`os-birthday-row ${shakeKey > 0 ? 'os-shake' : ''} ${rowError ? 'os-error' : ''}`}
            >
              <input
                ref={birthdayInputRef}
                type="text"
                className="os-birthday-input"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="DDMMYY"
                autoComplete="off"
                value={birthday}
                onChange={e => setBirthday(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); attemptSubmit(); } }}
              />
              <button
                type="button"
                className="os-submit-btn"
                aria-label="Enter"
                onClick={attemptSubmit}
                disabled={submitting}
              >
                →
              </button>
            </div>
            <p className={`os-form-message ${errorMsg ? 'os-visible' : ''}`}>{errorMsg}</p>
          </div>
        </div>
      </section>

      {/* 4. Success transition */}
      <section
        id="os-success"
        className={`os-screen ${screen === 'success' ? 'active' : ''}`}
        aria-label="Opening"
      >
        <div className="os-success-inner">
          <div className="os-success-glow" />
          <p className="os-success-text">The letter has opened.</p>
        </div>
      </section>
    </div>
  );
}
