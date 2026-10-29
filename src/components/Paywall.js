'use client';

import { useEffect, useState } from 'react';

const PERKS = [
  'All seven chapters, restored and unabridged',
  'Eleven songs, plus the final one',
  'Unlimited thadavi thariya',
  'Konjify on demand, no daily limit',
  'Lifetime supply of Daata pistachio milk cake*',
  'One very sorry Ammu, at no extra cost'
];

const PROCESSING_STEPS = [
  'Contacting your bank…',
  'Checking your feelings…',
  'Still a bit angry. Understandable…',
  'Counting every sorry I owe you…',
  'That is a lot of sorrys…',
  'Converting kisses to euro…',
  'Applying pistachio milk cake discount…',
  'Asking the chihuahua for a loan…'
];

const ENTER_STEPS = [
  'Undeleting everything…',
  'Putting the chapters back in order…',
  'Re-tuning all eleven songs…',
  'Dusting off the polaroids…',
  'Okay. It is all yours again.'
];

const STEP_MS = 950;

function formatLeft(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

export default function Paywall({ until }) {
  const [state, setState] = useState('idle'); // idle | processing | declined | broke | entering
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const end = Date.parse(until || '');
    if (!end) return;
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [until]);

  useEffect(() => {
    if (state !== 'processing' && state !== 'entering') return;
    const steps = state === 'processing' ? PROCESSING_STEPS : ENTER_STEPS;
    setStep(0);
    const timers = steps.slice(1).map((_, i) => setTimeout(() => setStep(i + 1), STEP_MS * (i + 1)));
    timers.push(setTimeout(() => {
      if (state === 'processing') setState('declined');
      else goIn();
    }, STEP_MS * steps.length));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function goIn() {
    const end = Date.parse(until || '');
    const maxAge = end ? Math.max(60, Math.floor((end - Date.now()) / 1000)) : 172800;
    document.cookie = `tlea_paid=1; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
    if (window.location.pathname.startsWith('/paywall')) window.location.href = '/';
    else window.location.reload();
  }

  const settled = state === 'declined' || state === 'broke';

  return (
    <div className="pay-root">
      <div className="pay-card">
        <p className="pay-eyebrow">
          <span className="pay-lock" aria-hidden="true">🔒</span> TLEA Premium
        </p>

        <div className={`pay-photo ${state === 'broke' ? 'pay-shake' : ''}`}>
          <img src="/paywall/chihuahua.jpg" alt="A chihuahua holding out an empty wallet" />
        </div>

        <h1 className="pay-title">Ammu, ten thousand yuuurooo</h1>
        <p className="pay-note">I&apos;m sorry. For the fight, and for deleting this.</p>
        <p className="pay-sub">
          I took down the one thing I made just for you, and that wasn&apos;t fair to you. It&apos;s
          all back now, every chapter, every song. But bringing a website back from the dead
          turns out to be expensive.
        </p>

        <div className="pay-plan">
          <div className="pay-plan-head">
            <span className="pay-plan-name">The Forgiveness Plan</span>
            <span className="pay-plan-tag">most popular</span>
          </div>
          <div className="pay-price">
            <span className="pay-price-amount">€10,000</span>
            <span className="pay-price-term">resurrection fee, non-negotiable</span>
          </div>
          <ul className="pay-perks">
            {PERKS.map(p => (
              <li key={p}><span className="pay-check" aria-hidden="true">✓</span>{p}</li>
            ))}
          </ul>
        </div>

        <div className="pay-actions" aria-live="polite">
          {state === 'idle' && (
            <>
              <button type="button" className="pay-btn" onClick={() => setState('processing')}>
                Pay €10,000
              </button>
              <button type="button" className="pay-link" onClick={() => setState('broke')}>
                I&apos;m broke too
              </button>
            </>
          )}

          {(state === 'processing' || state === 'entering') && (
            <div className="pay-processing">
              <span className="pay-spinner" aria-hidden="true" />
              <span key={`${state}-${step}`} className="pay-step">
                {(state === 'processing' ? PROCESSING_STEPS : ENTER_STEPS)[step]}
              </span>
            </div>
          )}

          {settled && (
            <div className="pay-result">
              {state === 'declined' ? (
                <p className="pay-result-main">
                  Payment declined. <span>Reason: insufficient funds.</span>
                </p>
              ) : (
                <p className="pay-result-main">
                  The chihuahua understands. <span>His wallet looks like that too.</span>
                </p>
              )}
              <p className="pay-result-hand">
                Fine. This one&apos;s on the house. I owe you way more than ten thousand anyway.
              </p>
              <button type="button" className="pay-btn" onClick={() => setState('entering')}>
                Come in, Ammu →
              </button>
            </div>
          )}
        </div>

        <p className="pay-accepts">
          We accept <span>hugs</span> · <span>kisses</span> · <span>pistachio milk cake</span> · <span>forgiveness</span>
        </p>

        {left !== null && left > 0 && (
          <p className="pay-timer">Offer ends in {formatLeft(left)}</p>
        )}

        <p className="pay-fine">
          *Pistachio milk cake subject to availability in Bray. Prices include VAT, emotional
          damage and three years of interest. Apology non-refundable.
        </p>
      </div>
    </div>
  );
}
