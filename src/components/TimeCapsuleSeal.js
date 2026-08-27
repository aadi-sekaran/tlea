'use client';

import { useState } from 'react';

export default function TimeCapsuleSeal({ author, existingLetter, unlocksOn }) {
  const [body, setBody] = useState(existingLetter?.body || '');
  const [photoUrls, setPhotoUrls] = useState(existingLetter?.photo_urls || []);
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(!!existingLetter?.sealed_at);
  const [error, setError] = useState('');

  if (sealed) {
    return (
      <div className="tc-status">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✉︎</div>
        <p className="tc-lock-msg">Your letter is sealed.</p>
        <p className="tc-lock-sub">Unlocks {unlocksOn}.</p>
        {photoUrls.length > 0 && (
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
            {photoUrls.length} photo{photoUrls.length !== 1 ? 's' : ''} attached.
          </p>
        )}
      </div>
    );
  }

  async function seal() {
    if (!body.trim()) {
      setError('write something first.');
      return;
    }
    if (!confirm('Save and seal this letter? You will not be able to edit it after.')) return;
    setSealing(true);
    setError('');
    try {
      const res = await fetch('/api/timecapsule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, photoUrls })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSealed(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSealing(false);
    }
  }

  return (
    <>
      <p className="tc-lock-sub" style={{ marginBottom: '1.5rem' }}>
        Write once. Save = sealed. Read next Sept 19.
      </p>
      <textarea
        className="tc-textarea"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Write to your future self, or to me, or to both."
      />
      <div className="tc-photo-upload">
        Photo attach: use the URL of a photo you have uploaded to the site.
        <br />
        <input
          type="text"
          placeholder="/polaroids/03.jpg"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              setPhotoUrls([...photoUrls, e.currentTarget.value.trim()]);
              e.currentTarget.value = '';
            }
          }}
          style={{
            width: '100%',
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'var(--ivory)'
          }}
        />
        {photoUrls.length > 0 && (
          <ul style={{ marginTop: '0.5rem', textAlign: 'left', paddingLeft: '1rem' }}>
            {photoUrls.map((url, i) => (
              <li key={i} style={{ fontSize: '0.8rem' }}>
                {url}{' '}
                <button
                  onClick={() => setPhotoUrls(photoUrls.filter((_, j) => j !== i))}
                  style={{ color: 'var(--rose)', marginLeft: '0.5rem' }}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="tc-save-btn" onClick={seal} disabled={sealing}>
        {sealing ? 'sealing...' : 'Save and seal'}
      </button>
      {error && <p className="tc-warning" style={{ color: 'var(--rose)' }}>{error}</p>}
      <p className="tc-warning">Once saved, this cannot be edited.</p>
    </>
  );
}
