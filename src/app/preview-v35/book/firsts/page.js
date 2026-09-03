'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../v35.module.css';
import { FIRSTS, LASTS } from '@/lib/content';

export default function FirstsLastsV35() {
  const [tab, setTab] = useState('firsts');
  const list = tab === 'firsts' ? FIRSTS : LASTS;

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Firsts &amp; Lasts</div>
        <h1 className={styles['page-title']}>A timeline of <em>us</em></h1>
        <p className={styles['page-sub']}>— {FIRSTS.length} firsts, {LASTS.length} lasts —</p>

        <div className={styles['fl-tabs']}>
          <button type="button" className={`${styles['fl-tab']} ${tab === 'firsts' ? styles.active : ''}`} onClick={() => setTab('firsts')}>Firsts</button>
          <button type="button" className={`${styles['fl-tab']} ${tab === 'lasts' ? styles.active : ''}`} onClick={() => setTab('lasts')}>Lasts</button>
        </div>

        <div className={styles['rows-list']}>
          {list.map((item, i) => (
            <div key={`${tab}-${i}`} className={styles['list-entry']}>
              <span className={styles['list-entry-date']}>{item.date}</span>
              <div className={styles['list-entry-body']}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
