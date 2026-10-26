'use client';

import { useEffect, useState } from 'react';
import SafeImg from '@/components/SafeImg';

const TMDB_IMG = 'https://image.tmdb.org/t/p/w342';

function oneLiner(entry, poster) {
  if (entry.note) return entry.note;
  if (!poster || !poster.overview) return null;
  const firstSentence = poster.overview.split(/(?<=[.!?])\s/)[0];
  const text = firstSentence.length <= 140 ? firstSentence : `${poster.overview.slice(0, 137)}...`;
  return text;
}

export default function WatchedGrid({ baseItems, posters, kind, addLabel }) {
  const [extraItems, setExtraItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/watched?kind=${kind}`)
      .then(res => (res.ok ? res.json() : { data: [] }))
      .then(({ data }) => {
        if (!cancelled) setExtraItems(data || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [kind]);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/watched', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, name })
      });
      const result = await res.json();
      if (!res.ok || result.error) {
        setError(result.error || 'could not add');
        return;
      }
      setExtraItems(items => [...items, result.data]);
      setName('');
      setAdding(false);
    } catch {
      setError('could not add');
    } finally {
      setSaving(false);
    }
  }

  const items = [...baseItems, ...extraItems.map(item => ({ name: item.name, note: null }))];

  return (
    <div className="watched-grid">
      {items.map((entry, i) => {
        const poster = posters[entry.name];
        const posterUrl = poster && poster.posterPath ? `${TMDB_IMG}${poster.posterPath}` : null;
        const line = oneLiner(entry, poster);
        return (
          <div key={`${entry.name}-${i}`} className="watched-card">
            <div className="watched-poster">
              <SafeImg
                srcs={posterUrl ? [posterUrl] : []}
                alt={`${entry.name} poster`}
                className="watched-poster-img"
                textFallback={entry.name}
              />
            </div>
            <div className="watched-card-title">{entry.name}</div>
            {line && <div className="watched-card-line">{line}</div>}
          </div>
        );
      })}
      <div className="watched-card">
        {adding ? (
          <form className="watched-add-tile watched-add-form" onSubmit={submit}>
            <input
              autoFocus
              className="watched-add-input"
              type="text"
              placeholder="title"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={120}
            />
            <button type="submit" className="watched-add-submit" disabled={saving || !name.trim()}>
              {saving ? 'adding...' : 'add'}
            </button>
            {error && <span className="watched-add-error">{error}</span>}
          </form>
        ) : (
          <button type="button" className="watched-add-tile" onClick={() => setAdding(true)}>
            <span className="watched-add-plus">+</span>
            <span className="watched-add-label">{addLabel}</span>
          </button>
        )}
        <div className="watched-add-caption">from now, whatever comes next</div>
      </div>
    </div>
  );
}
