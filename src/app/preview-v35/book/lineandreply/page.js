'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../v35.module.css';
import { LINE_AND_REPLY } from '@/lib/content';

export default function LineAndReplyV35() {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const item = LINE_AND_REPLY[i];

  function next() {
    setRevealed(false);
    setI(v => (v + 1) % LINE_AND_REPLY.length);
  }

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>The line and the reply</div>
        <h1 className={styles['page-title']}>A conversation, <em>replayed</em></h1>
        <p className={styles['page-sub']}>{i + 1} of {LINE_AND_REPLY.length} · {item.date}</p>

        <div className={styles['chapter-synopsis']} style={{ textAlign: 'left' }}>
          <span className={styles['chapter-synopsis-label']}>{item.line.speaker}</span>
          {item.line.text}
        </div>

        {revealed ? (
          <div className={styles['chapter-synopsis']} style={{ marginTop: 20, background: 'rgba(219, 206, 230, 0.35)', borderLeftColor: 'var(--lavender-deep)' }}>
            <span className={styles['chapter-synopsis-label']}>{item.reply.speaker}</span>
            {item.reply.text}
          </div>
        ) : (
          <button type="button" className={styles['password-submit']} style={{ marginTop: 20 }} onClick={() => setRevealed(true)}>
            Reveal the reply
          </button>
        )}

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button type="button" className={styles['btn-secondary']} onClick={next}>Next →</button>
        </div>
      </div>
    </div>
  );
}
