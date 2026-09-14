'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// dark = Toothless (Aadi), light = Light Fury (Krithika) - same role strings
// the session/login API already expects, so nothing downstream changes.
const ROLES = { one: 'dark', two: 'light' };

const UNSEAL_SOURCES = [
  { src: '/opening/unseal.webm', type: 'video/webm' },
  { src: '/opening/unseal.mp4', type: 'video/mp4' }
];

// Picks a source ourselves rather than relying on sibling <source> fallback:
// once a browser commits to one by its declared type, it does not reliably
// fall back if that source silently fails to decode. This filters obviously
// unsupported formats with canPlayType and reacts to a genuine 'error' event
// by trying the next candidate for real.
function attachSources(video, candidates, onExhausted) {
  if (!video || candidates.length === 0) return;
  const maybePlayable = candidates.filter(c => video.canPlayType(c.type) !== '');
  const list = maybePlayable.length ? maybePlayable : candidates;
  let i = 0;
  function tryNext() {
    if (i >= list.length) {
      onExhausted?.();
      return;
    }
    video.src = list[i].src;
    i++;
  }
  video.addEventListener('error', tryNext);
  tryNext();
}

export default function OpeningSequence() {
  const router = useRouter();

  const [reducedMotion, setReducedMotion] = useState(false);
  const [state, setState] = useState('idle'); // idle | opening | open
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [focus, setFocus] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showUi, setShowUi] = useState(false);

  const [chosen, setChosen] = useState(null); // 'dark' | 'light'
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [wrongKey, setWrongKey] = useState(0);
  const [nudgeKey, setNudgeKey] = useState(0);

  const vidRef = useRef(null);
  const pwRef = useRef(null);
  const settleTimerRef = useRef(null);
  const videoBroken = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = e => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    attachSources(vidRef.current, UNSEAL_SOURCES, () => {
      videoBroken.current = true;
      settle(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settle(instant) {
    setState(prev => {
      if (prev !== 'opening') return prev;
      clearTimeout(settleTimerRef.current);
      setShowSkip(false);
      setShowFinal(true);
      setFocus(true);
      setTimeout(() => {
        try { vidRef.current?.pause(); } catch {}
        setShowVideo(false);
      }, 500);
      setTimeout(() => setShowUi(true), instant ? 260 : 560);
      return 'open';
    });
  }

  function openLetter() {
    if (state !== 'idle') return;
    setState('opening');
    setOpened(true);

    if (reducedMotion || videoBroken.current) {
      setTimeout(() => settle(true), 260);
      return;
    }

    setTimeout(() => {
      setShowVideo(true);
      const p = vidRef.current?.play();
      if (p && p.catch) p.catch(() => settle(true));
      setShowSkip(true);
      const dur = vidRef.current?.duration;
      settleTimerRef.current = setTimeout(() => settle(false), (dur ? dur * 1000 : 5100) + 700);
    }, 220);
  }

  function handleVideoEnded() {
    settle(false);
  }

  function selectDragon(role) {
    setChosen(role);
    setMsg('');
    setTimeout(() => pwRef.current?.focus({ preventScroll: true }), 0);
  }

  function say(text) {
    setMsg(text);
  }

  async function submit() {
    if (state !== 'open' || submitting) return;
    if (!chosen) {
      say('Pick which dragon is you first.');
      setNudgeKey(k => k + 1);
      return;
    }
    const typed = password.trim();
    if (!typed) {
      say('Type your password.');
      pwRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: chosen, password: typed })
      });
      const data = await res.json();
      if (data.ok) {
        fetch('/api/login-notify', { method: 'POST' }).catch(() => {});
        unlock();
      } else {
        setWrongKey(k => k + 1);
        say("That word doesn't open it. Try again.");
        pwRef.current?.select();
      }
    } catch {
      setWrongKey(k => k + 1);
      say('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function unlock() {
    say('Unlocked');
    setBloom(true);
    setShowUi(false);
    setTimeout(() => {
      router.push('/book');
    }, reducedMotion ? 400 : 1400);
  }

  return (
    <div className="ao-root">
      <div className="ao-scene">
        <div className="ao-spill a" />
        <div className={`ao-spill b ${opened ? 'show' : ''}`} />

        <div className={`ao-stage ${focus ? 'focus' : ''} ${bloom ? 'bloom' : ''}`}>
          <img className="ao-layer idle" src="/opening/idle.jpg" alt="Two dragons resting on a sealed letter" />
          <video
            ref={vidRef}
            className={`ao-layer vid ${showVideo ? 'show' : ''}`}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            onEnded={handleVideoEnded}
          />
          <img
            className={`ao-layer final ${showFinal ? 'show' : ''}`}
            src="/opening/final.jpg"
            alt=""
            aria-hidden="true"
          />

          <button
            className={`ao-seal ${state !== 'idle' ? 'pressed' : ''}`}
            aria-label="Touch the seal to open the letter"
            onClick={openLetter}
          />

          <div className={`ao-ui ${showUi ? 'show' : ''} ${chosen ? 'chosen' : ''}`} role="group" aria-label="Sign in">
            <button
              key={`pick-one-${nudgeKey}`}
              className={`ao-pick one ${chosen === ROLES.one ? 'on' : ''} ${!chosen && nudgeKey ? 'nudge' : ''}`}
              type="button"
              aria-pressed={chosen === ROLES.one}
              aria-label="Choose Toothless"
              onClick={() => selectDragon(ROLES.one)}
            />
            <button
              key={`pick-two-${nudgeKey}`}
              className={`ao-pick two ${chosen === ROLES.two ? 'on' : ''} ${!chosen && nudgeKey ? 'nudge' : ''}`}
              type="button"
              aria-pressed={chosen === ROLES.two}
              aria-label="Choose the Light Fury"
              onClick={() => selectDragon(ROLES.two)}
            />
            <span className={`ao-ph ${password ? 'hide' : ''}`} aria-hidden="true">Enter your password</span>
            <input
              key={wrongKey}
              ref={pwRef}
              className={`ao-pw ${wrongKey ? 'wrong' : ''}`}
              type="password"
              placeholder=" "
              autoComplete="current-password"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Password"
              enterKeyHint="go"
              value={password}
              onChange={e => { setPassword(e.target.value); if (msg && msg !== 'Unlocked') say(''); }}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            />
            <button className="ao-go" type="button" aria-label="Open the letter" onClick={submit} disabled={submitting} />
            <p className={`ao-msg ${msg ? 'show' : ''}`} role="status" aria-live="polite">{msg}</p>
          </div>
        </div>

        <p className={`ao-hint ${opened ? 'ao-hide' : ''}`}>Touch the seal</p>
        <button className={`ao-skip ${showSkip ? 'show' : ''}`} type="button" onClick={() => settle(true)}>Skip</button>
      </div>
    </div>
  );
}
