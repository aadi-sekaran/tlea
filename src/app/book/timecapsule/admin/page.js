import Link from 'next/link';
import { redirect } from 'next/navigation';
import { readSession, isAadi } from '@/lib/session';
import { adminReadAll } from '@/lib/timecapsule';

export default async function TimeCapsuleAdminPage() {
  const session = await readSession();
  // Silent guard: unless it's Aadi, redirect to normal capsule page (no hint that admin exists).
  if (!session || !isAadi(session)) {
    redirect('/book/timecapsule');
  }

  const letters = await adminReadAll();

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book/timecapsule" className="nav-back">← capsule</Link>
        <span className="nav-title">Admin</span>
        <span />
      </div>
      <div className="tc-shell">
        <div className="tc-admin-badge">ADMIN VIEW — DARK DRAGON ONLY</div>
        <h1 className="content-title">Both letters, all the time</h1>
        {letters.length === 0 ? (
          <p style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-hand)' }}>
            No letters sealed yet.
          </p>
        ) : (
          letters.map(l => (
            <div key={l.id} className="tc-admin-letter">
              <div className="tc-admin-letter-header">
                {l.author === 'dark' ? 'Aadi' : 'Krithika'}
                {' · '}
                {l.year}
                {' · sealed '}
                {new Date(l.sealed_at).toLocaleDateString()}
                {' · unlocks '}
                {new Date(l.unlocks_at).toLocaleDateString()}
              </div>
              <div className="tc-admin-letter-body">{l.body}</div>
              {l.photo_urls && l.photo_urls.length > 0 && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                  Photos: {l.photo_urls.join(', ')}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
