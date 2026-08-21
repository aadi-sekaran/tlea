'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Cover() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prefetch login for instant nav
    router.prefetch('/login');
  }, [router]);

  function handleEnvelope() {
    if (open) { router.push('/login'); return; }
    setOpen(true);
    setTimeout(() => setReady(true), 900);
  }

  return (
    <section className="screen cover-screen active">
      <div className="cover-motifs">
        {[0,1,2,3,4,5].map(i => <span key={i} className="motif-star">✦</span>)}
      </div>
      <div className="cover-eyebrow">A book · for Ammu · from Ammu</div>
      <div className="envelope-wrap">
        <div className={`envelope ${open ? 'open' : ''}`} onClick={handleEnvelope}>
          <div className="flap"></div>
          <div className="wax">A</div>
          <div className="address">
            <div className="to">for you</div>
            <div className="from">from me &nbsp;·&nbsp; Dublin</div>
          </div>
          <div className="letter">
            <h1>The Last Ever<br /><em>Apology, Truly</em></h1>
            <div className="subtitle">three years, one book</div>
          </div>
        </div>
      </div>
      {!open && <p className="cover-hint">tap the envelope</p>}
      <button
        className={`cover-cta ${ready ? 'ready' : ''}`}
        onClick={() => router.push('/login')}
      >
        Open the book →
      </button>
    </section>
  );
}
