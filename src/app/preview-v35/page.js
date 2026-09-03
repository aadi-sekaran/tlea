'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './v35.module.css';
import { COVER_COPY } from '@/content/locked-v35';

export default function CoverPageV35() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleTap() {
    if (open) {
      router.push('/preview-v35/login');
      return;
    }
    setOpen(true);
    if (typeof window !== 'undefined') window.__tleaAutoplayMusic?.();
  }

  return (
    <div className={`${styles.cover} ${open ? styles.opened : ''}`}>
      <div className={styles.sparkles}>
        {Array.from({ length: 6 }).map((_, i) => <span key={i} className={styles.sparkle}>✦</span>)}
      </div>
      <div className={styles['cover-eyebrow']}>{COVER_COPY.eyebrow}</div>

      <div className={styles['envelope-stage']}>
        <div
          className={`${styles.envelope} ${open ? styles.open : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Open the envelope"
          onClick={handleTap}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTap(); } }}
        >
          <div className={`${styles['env-seam']} ${styles.left}`} />
          <div className={`${styles['env-seam']} ${styles.right}`} />
          <div className={`${styles['env-seam']} ${styles.bottom}`} />
          <div className={styles['env-postmark']}>
            <div className={styles['env-postmark-text']}>{COVER_COPY.postmarkLine1}<br />{COVER_COPY.postmarkLine2}</div>
          </div>
          <div className={styles['env-stamp']}><div className={styles['env-stamp-inner']}>{COVER_COPY.stampLetter}</div></div>
          <div className={styles['env-address']}>
            <div className={styles['env-to']}>{COVER_COPY.addressTo}</div>
            <div className={styles['env-from']}>{COVER_COPY.addressFrom}</div>
          </div>
          <div className={styles['env-flap']} />
          <div className={styles['env-wax']}><div className={styles['wax-body']}><div className={styles['wax-monogram']}>{COVER_COPY.waxMonogram}</div></div></div>
          <div className={styles['env-letter']}>
            <div className={styles['env-letter-flourish']}>{COVER_COPY.letterFlourish}</div>
            <div className={styles['env-letter-title']}>{COVER_COPY.letterTitle}<br /><em>{COVER_COPY.letterTitleEm}</em></div>
            <div className={styles['env-letter-sub']}>{COVER_COPY.letterSub}</div>
            <div className={styles['env-letter-flourish']}>{COVER_COPY.letterFlourish}</div>
          </div>
        </div>
      </div>

      <p className={`${styles['cover-hint']} ${open ? styles.gone : ''}`}>{COVER_COPY.hint}</p>
      <button className={styles['cover-cta']} onClick={() => router.push('/preview-v35/login')}>
        {COVER_COPY.cta}
      </button>
    </div>
  );
}
