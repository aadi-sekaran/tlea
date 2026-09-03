import Link from 'next/link';
import styles from '../../v35.module.css';
import { FOREWORD_V35 } from '@/content/locked-v35';

export default function ForewordV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>{FOREWORD_V35.eyebrow}</div>
        <h1 className={styles['page-title']}>{FOREWORD_V35.titlePre}<em>{FOREWORD_V35.titleEm}</em></h1>
        <p className={styles['page-sub']}>{FOREWORD_V35.sub}</p>
        <div className={styles['foreword-body']}>
          {FOREWORD_V35.body.map((p, i) => <p key={i}>{p}</p>)}
          <div className={styles['foreword-signoff']}>{FOREWORD_V35.signoff}</div>
        </div>
      </div>
    </div>
  );
}
