'use client';

import { useState } from 'react';

export default function ReleaseTimer({ initialStatus, initialDays }) {
  const [status, setStatus] = useState(initialStatus);
  const [days, setDays] = useState(initialDays);
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!confirm('Start the 30-day countdown? Your profile will be erased when it hits zero. You can cancel any time.')) return;
    setLoading(true);
    const res = await fetch('/api/release-timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start' })
    });
    const data = await res.json();
    if (data.data) {
      setStatus(data.data);
      setDays(30);
    }
    setLoading(false);
  }

  async function cancel() {
    setLoading(true);
    const res = await fetch('/api/release-timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel' })
    });
    const data = await res.json();
    if (data.data) {
      setStatus(null);
      setDays(null);
    }
    setLoading(false);
  }

  if (status && days !== null) {
    return (
      <>
        <div className="release-status">
          <div className="release-countdown">{days} days</div>
          <div className="release-countdown-sub">until this comes down.</div>
        </div>
        <button className="release-btn-cancel" onClick={cancel} disabled={loading}>
          {loading ? 'cancelling...' : 'Stop the countdown'}
        </button>
      </>
    );
  }

  return (
    <button className="release-btn-danger" onClick={start} disabled={loading}>
      {loading ? 'starting...' : 'Start 30-day countdown'}
    </button>
  );
}
