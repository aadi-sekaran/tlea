'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../v35.module.css';
import { LOGIN_COPY } from '@/content/locked-v35';

export default function LoginPageV35() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  function pick(which) {
    setRole(which);
    setError('');
  }

  async function submit(e) {
    e.preventDefault();
    if (!role) return;
    if (!password.trim()) {
      setError(LOGIN_COPY.errorEmpty);
      return;
    }
    setLoading(true);
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, password })
    });
    const data = await res.json();
    if (data.ok) {
      fetch('/api/login-notify', { method: 'POST' }).catch(() => {});
      router.push('/preview-v35/book');
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(next >= 3 ? "hint: the other one's birthday, day and month, six digits like DDMMYY" : 'not that. try again.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles['login-inner']}>
        <div className={styles['login-brand']}>{LOGIN_COPY.brand}</div>
        <h1 className={styles['login-title']}>{LOGIN_COPY.titlePre}<em>{LOGIN_COPY.titleEm}</em></h1>
        <p className={styles['login-sub']}>
          {LOGIN_COPY.subPre}<strong>{LOGIN_COPY.subDarkStrong}</strong>{LOGIN_COPY.subMid}<strong>{LOGIN_COPY.subLightStrong}</strong>{LOGIN_COPY.subPost}
        </p>

        <div className={styles['profile-pair']}>
          <button
            type="button"
            className={`${styles['profile-card']} ${role === 'dark' ? styles.selected : ''}`}
            onClick={() => pick('dark')}
          >
            <span className={`${styles['profile-avatar']} ${styles.dark}`}>
              <span
                className={styles['profile-avatar-img']}
                style={{ backgroundImage: 'url(/dragons/dragons-login.png)', backgroundPosition: 'left center' }}
              />
            </span>
            <div className={styles['profile-name']}>{LOGIN_COPY.profileName}</div>
            <div className={styles['profile-tag']}>{LOGIN_COPY.darkTag}</div>
          </button>
          <button
            type="button"
            className={`${styles['profile-card']} ${role === 'light' ? styles.selected : ''}`}
            onClick={() => pick('light')}
          >
            <span className={`${styles['profile-avatar']} ${styles.light}`}>
              <span
                className={styles['profile-avatar-img']}
                style={{ backgroundImage: 'url(/dragons/dragons-login.png)', backgroundPosition: 'right center' }}
              />
            </span>
            <div className={styles['profile-name']}>{LOGIN_COPY.profileName}</div>
            <div className={styles['profile-tag']}>{LOGIN_COPY.lightTag}</div>
          </button>
        </div>

        <div className={`${styles['password-shell']} ${role ? styles.active : ''}`}>
          <div className={styles['password-hint']}>
            {role === 'dark' ? LOGIN_COPY.hintDark : role === 'light' ? LOGIN_COPY.hintLight : LOGIN_COPY.hintNone}
          </div>
          <form onSubmit={submit}>
            <input
              type="text"
              className={styles['password-input']}
              placeholder="DDMMYY"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              inputMode="numeric"
              disabled={!role}
            />
            <button type="submit" className={styles['password-submit']} disabled={!role || loading}>
              {loading ? 'opening...' : LOGIN_COPY.submit}
            </button>
          </form>
          <div className={`${styles['password-error']} ${error ? styles.show : ''}`}>{error}</div>
        </div>
      </div>
    </div>
  );
}
