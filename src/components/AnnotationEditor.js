'use client';

import { useState } from 'react';

export default function AnnotationEditor({ sectionKey, itemKey, author, existing = [] }) {
  const [entries, setEntries] = useState(existing);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft.trim()) return;
    setSaving(true);
    const res = await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionKey,
        itemKey,
        author,
        body: draft.trim()
      })
    });
    const data = await res.json();
    if (data.data) {
      setEntries([...entries, data.data]);
      setDraft('');
    }
    setSaving(false);
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {entries.map(e => (
        <div key={e.id} style={{
          padding: '0.6rem 0.8rem',
          background: 'var(--cream)',
          borderRadius: '10px',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-hand)',
          fontSize: '1rem'
        }}>
          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.2rem' }}>
            {e.author === 'dark' ? 'Aadi' : 'Krithika'}
          </div>
          {e.body}
        </div>
      ))}
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="add a note..."
        style={{
          width: '100%',
          minHeight: '60px',
          padding: '0.6rem 0.8rem',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          background: 'white',
          fontFamily: 'var(--font-hand)',
          fontSize: '1rem',
          resize: 'vertical'
        }}
      />
      <button
        onClick={save}
        disabled={saving || !draft.trim()}
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem 1.2rem',
          background: 'var(--rose)',
          color: 'white',
          borderRadius: '999px',
          fontSize: '0.85rem'
        }}
      >
        {saving ? 'saving...' : 'add'}
      </button>
    </div>
  );
}
