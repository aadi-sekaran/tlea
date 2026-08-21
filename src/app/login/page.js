'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  function pick(which) {
    setSelected(which);
    setError('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function submit(e) {
    e?.preventDefault();
    if (!selected) return;
    if (!password.trim()) { setError('write the date first'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dragon: selected, password }),
      });
      if (res.ok) {
        router.push('/book');
      } else {
        setAttempts(a => a + 1);
        setError(attempts >= 2 ? 'hint: month starts with S…' : 'not quite');
        setPassword('');
      }
    } catch {
      setError('something went wrong. try again.');
    } finally {
      setLoading(false);
    }
  }

  const hint = selected === 'dark'
    ? 'her birthday · dd/mm/yyyy'
    : selected === 'light'
    ? 'his birthday · dd/mm/yyyy'
    : 'tap a dragon first';

  return (
    <section className="screen login-screen active">
      <div className="login-inner">
        <div className="login-eyebrow">who are you</div>
        <h1 className="login-title">Two <em>Ammus</em></h1>
        <p className="login-intro">
          The <strong>dark dragon</strong> is Aadi. The <strong>white dragon</strong> is Krithika. Pick the one that is you.
        </p>

        <div className="dragon-pair">
          <button
            className={`dragon-card ${selected === 'dark' ? 'selected' : ''}`}
            onClick={() => pick('dark')}
            type="button"
          >
            <div className="dragon-image">
              <Image src="/dragon-dark.webp" alt="dark dragon" width={200} height={200} priority />
            </div>
            <div className="dragon-name">Ammu</div>
            <div className="dragon-sub">the dark one</div>
          </button>
          <button
            className={`dragon-card ${selected === 'light' ? 'selected' : ''}`}
            onClick={() => pick('light')}
            type="button"
          >
            <div className="dragon-image">
              <Image src="/dragon-light.webp" alt="light dragon" width={200} height={200} priority />
            </div>
            <div className="dragon-name">Ammu</div>
            <div className="dragon-sub">the white one</div>
          </button>
        </div>

        <form onSubmit={submit} className={`password-shell ${selected ? 'active' : ''}`}>
          <div className="password-hint">{hint}</div>
          <input
            ref={inputRef}
            type="text"
            className="password-input"
            placeholder="dd/mm/yyyy"
            inputMode="numeric"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={!selected || loading}
          />
          <button type="submit" className="password-submit" disabled={!selected || loading}>
            {loading ? '…' : 'Come in'}
          </button>
          <div className={`password-error ${error ? 'show' : ''}`}>{error}</div>
        </form>
      </div>
    </section>
  );
}
