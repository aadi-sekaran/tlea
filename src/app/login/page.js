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

  return (
    <div className="login">
      <div className="login-inner">
        <h1 className="login-title">Choose your Ammu.</h1>
        <p className="login-hint">and enter the other one's birthday.</p>

        <div className="dragon-picker">
          <button
            type="button"
            className={`dragon-choice ${role === 'dark' ? 'selected' : ''}`}
            onClick={() => setRole('dark')}
            aria-label="Aadi's dragon"
          >
            {/* Left half of the login portrait image */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/dragons/dragons-login.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }} />
          </button>
          <button
            type="button"
            className={`dragon-choice ${role === 'light' ? 'selected' : ''}`}
            onClick={() => setRole('light')}
            aria-label="Krithika's dragon"
          >
            {/* Right half */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/dragons/dragons-login.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat'
            }} />
          </button>
        </div>

        <form onSubmit={submit}>
          <input
            type="text"
            className="login-input"
            placeholder="DDMMYY"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="off"
            inputMode="numeric"
          />
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'opening...' : 'Open'}
          </button>
        </form>
        <p className="login-error">{error}</p>
      </div>
    </div>
  );
}
