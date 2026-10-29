'use client';

import { useEffect, useState } from 'react';

const PERKS = [
  'All seven chapters, unabridged',
  'Eleven songs, plus the final one',
  'Unlimited thadavi thariya',
  'Konjify on demand, no daily limit',
  'Lifetime supply of Daata pistachio milk cake*'
];

const PROCESSING_STEPS = ['Contacting your bank…', 'Checking your feelings…', 'Converting kisses to euro…'];

function formatLeft(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

export default function Paywall({ until }) {
  const [state, setState] = useState('idle'); // idle | processing | declined | broke
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
    if (state !== 'processing') return;
    setStep(0);
    const a = setTimeout(() => setStep(1), 900);
    const b = setTimeout(() => setStep(2), 1800);
    const c = setTimeout(() => setState('declined'), 2700);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, [state]);

  function enter() {
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
        <p className="pay-sub">
          The Last Ever Apology, Truly has gone premium. Turns out apologising this beautifully
          was never going to be free.
        </p>

        <div className="pay-plan">
          <div className="pay-plan-head">
            <span className="pay-plan-name">The Forgiveness Plan</span>
            <span className="pay-plan-tag">most popular</span>
          </div>
          <div className="pay-price">
            <span className="pay-price-amount">€10,000</span>
            <span className="pay-price-term">one time, non-negotiable</span>
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

          {state === 'processing' && (
            <div className="pay-processing">
              <span className="pay-spinner" aria-hidden="true" />
              <span>{PROCESSING_STEPS[step]}</span>
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
              <p className="pay-result-hand">Fine. This one&apos;s on the house.</p>
              <button type="button" className="pay-btn" onClick={enter}>
                Come in, Ammu →
              </button>
            </div>
          )}
        </div>

        <p className="pay-accepts">
          We accept <span>hugs</span> · <span>kisses</span> · <span>pistachio milk cake</span> · <span>IOUs</span>
        </p>

        {left !== null && left > 0 && (
          <p className="pay-timer">Offer ends in {formatLeft(left)}</p>
        )}

        <p className="pay-fine">
          *Pistachio milk cake subject to availability in Bray. Prices include VAT, emotional
          damage and three years of interest. No refunds.
        </p>
      </div>
    </div>
  );
}
