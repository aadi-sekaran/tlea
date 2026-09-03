'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  function pick(r) {
    setRole(r);
    setError('');
  }

  function back() {
    if (loading) return;
    setRole(null);
    setPassword('');
    setError('');
  }

  async function submit(e) {
    e.preventDefault();
    if (!role) { setError('pick a dragon first.'); return; }
    if (!password) { setError('the birthday.'); return; }
    setLoading(true);
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, password })
    });
    const data = await res.json();
    if (data.ok) {
      // Fire-and-forget login notify
      fetch('/api/login-notify', { method: 'POST' }).catch(() => {});
      router.push('/book');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setError('hint: the other one\'s birthday, day and month, six digits like DDMMYY');
      } else {
        setError('not that. try again.');
      }
      setLoading(false);
    }
  }

  const step = role ? 'password' : 'profiles';

  return (
    <div className="login">
      <span className="brand-mark">the last ever apology, truly</span>
      <div className="login-veil" aria-hidden="true" />

      <div className="login-inner">
        <section className={`login-step login-step-profiles ${step === 'profiles' ? 'is-active' : 'is-past'}`} aria-hidden={step !== 'profiles'}>
          <h1 className="login-title">Choose your Ammu.</h1>
          <p className="login-hint">and enter the other one&apos;s birthday.</p>

          <div className="dragon-picker">
            <button
              type="button"
              className="dragon-profile"
              onClick={() => pick('dark')}
              tabIndex={step === 'profiles' ? 0 : -1}
            >
              <span className="dragon-choice">
                <span
                  className="dragon-choice-img"
                  style={{
                    backgroundImage: 'url(/dragons/dragons-login.png)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: 'left center'
                  }}
                />
              </span>
              <span className="dragon-profile-name">Aadi</span>
            </button>
            <button
              type="button"
              className="dragon-profile"
              onClick={() => pick('light')}
              tabIndex={step === 'profiles' ? 0 : -1}
            >
              <span className="dragon-choice">
                <span
                  className="dragon-choice-img"
                  style={{
                    backgroundImage: 'url(/dragons/dragons-login.png)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: 'right center'
                  }}
                />
              </span>
              <span className="dragon-profile-name">Krithika</span>
            </button>
          </div>
        </section>

        <section className={`login-step login-step-password ${step === 'password' ? 'is-active' : 'is-past'}`} aria-hidden={step !== 'password'}>
          <button type="button" className="login-back" onClick={back} tabIndex={step === 'password' ? 0 : -1}>
            ← not this one
          </button>

          <span className="dragon-choice dragon-choice-lg selected">
            <span
              className="dragon-choice-img"
              style={{
                backgroundImage: 'url(/dragons/dragons-login.png)',
                backgroundSize: '200% 100%',
                backgroundPosition: role === 'dark' ? 'left center' : 'right center'
              }}
            />
          </span>

          <h1 className="login-title login-title-sm">and enter the other one&apos;s birthday.</h1>

          <form onSubmit={submit}>
            <input
              type="text"
              className="login-input"
              placeholder="DDMMYY"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              inputMode="numeric"
              autoFocus={step === 'password'}
              tabIndex={step === 'password' ? 0 : -1}
            />
            <button type="submit" className="login-submit" disabled={loading} tabIndex={step === 'password' ? 0 : -1}>
              {loading ? 'opening...' : 'Open'}
            </button>
          </form>
          <p className="login-error">{error}</p>
        </section>
      </div>
    </div>
  );
}
