'use client';

import Link from 'next/link';
import { ON_THIS_DAY } from '@/lib/content';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(mmdd) {
  const [mm, dd] = mmdd.split('-');
  return `${MONTHS[parseInt(mm, 10) - 1]} ${parseInt(dd, 10)}`;
}

export default function OnThisDayPage() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;
  const todaysMemory = ON_THIS_DAY.find(m => m.date === todayKey);

  const sorted = [...ON_THIS_DAY].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">On This Day</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">today, one year ago (or two, or three)</p>
        <h1 className="content-title">On This Day</h1>

        {todaysMemory ? (
          <div className="otd-today-card">
            <div className="otd-year">on this day, {todaysMemory.year}</div>
            <p className="otd-memory">{todaysMemory.body}</p>
          </div>
        ) : (
          <div className="otd-empty">
            nothing marked for today. it does not mean nothing happened.
          </div>
        )}

        <h2 style={{ marginTop: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--rose)', fontSize: '1.3rem' }}>
          Every day we tagged
        </h2>
        <div className="otd-calendar">
          {sorted.map((m, i) => (
            <div key={i} className="otd-date-card">
              <div className="otd-date-label">{formatDate(m.date)}, {m.year}</div>
              <div className="otd-date-preview">{m.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
