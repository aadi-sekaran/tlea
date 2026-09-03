import Link from 'next/link';
import styles from '../../v35.module.css';
import { NUMBERS, LEDGER } from '@/lib/content';

export default function LedgerV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Ledger of numbers</div>
        <h1 className={styles['page-title']}>What we <em>counted</em></h1>
        <p className={styles['page-sub']}>— the numbers, and the small acts —</p>

        <div className={styles['numbers-band']}>
          {NUMBERS.map(n => (
            <div key={n.label}>
              <div className={styles['number-value']}>{n.value}</div>
              <div className={styles['number-label']}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className={styles['rows-list']}>
          {LEDGER.map((l, i) => (
            <div key={i} className={styles['list-entry']}>
              <span className={styles['list-entry-date']}>{l.who} · {l.date}</span>
              <div className={styles['list-entry-body']}>{l.what}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
