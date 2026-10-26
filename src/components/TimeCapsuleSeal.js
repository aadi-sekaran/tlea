'use client';

import { useRef, useState } from 'react';
import SafeImg from '@/components/SafeImg';
import { TIMECAPSULE_SEALED_ART } from '@/lib/dragons';

// Resizes/compresses a picked photo client-side so it doesn't blow up the
// letter row, then hands back a data URL we can store and render directly.
function fileToDataUrl(file, maxDim = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('could not read that file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('could not read that image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function TimeCapsuleSeal({ author, existingLetter, unlocksOn }) {
  const [body, setBody] = useState(existingLetter?.body || '');
  const [photoUrls, setPhotoUrls] = useState(existingLetter?.photo_urls || []);
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(!!existingLetter?.sealed_at);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const dataUrls = await Promise.all(files.map(f => fileToDataUrl(f)));
      setPhotoUrls(prev => [...prev, ...dataUrls]);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  if (sealed) {
    return (
      <div className="tc-status">
        <SafeImg srcs={TIMECAPSULE_SEALED_ART} alt="" className="tc-icon" />
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
      {/* asset: public/dragons/03_Stickers_Pack/stickers_018.png (awake, sitting-up pair) */}
      <img
        className="tc-icon"
        src="/dragons/03_Stickers_Pack/stickers_018.png"
        alt=""
        style={{ marginBottom: '1rem' }}
      />
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
        Attach a photo, from your files or your gallery.
        <br />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          disabled={uploading}
          onChange={e => handleFiles(e.target.files)}
          style={{ marginTop: '0.5rem' }}
        />
        {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginTop: '0.4rem' }}>adding photo...</p>}

        {photoUrls.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.75rem' }}>
            {photoUrls.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img
                  src={url}
                  alt=""
                  style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
                <button
                  onClick={() => setPhotoUrls(photoUrls.filter((_, j) => j !== i))}
                  aria-label="remove photo"
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--rose)',
                    color: 'white',
                    fontSize: '0.75rem',
                    lineHeight: 1,
                    border: 'none'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <details style={{ marginTop: '0.75rem' }}>
          <summary style={{ fontSize: '0.8rem', color: 'var(--text-soft)', cursor: 'pointer' }}>
            Or paste the URL of a photo already on the site
          </summary>
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
        </details>
      </div>
      <button className="tc-save-btn" onClick={seal} disabled={sealing || uploading}>
        {sealing ? 'sealing...' : 'Save and seal'}
      </button>
      {error && <p className="tc-warning" style={{ color: 'var(--rose)' }}>{error}</p>}
      <p className="tc-warning">Once saved, this cannot be edited.</p>
    </>
  );
}
