import Link from 'next/link';
import styles from '../../v35.module.css';
import { ON_THIS_DAY } from '@/lib/content';

export default function OnThisDayV35() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;
  const todaysMemories = ON_THIS_DAY.filter(m => m.date === todayKey);

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>On this day</div>
        <h1 className={styles['page-title']}>Across three <em>years</em></h1>
        <p className={styles['page-sub']}>— today, one year (or more) ago —</p>

        {todaysMemories.length > 0 ? (
          <div className={styles['chapter-synopsis']} style={{ marginBottom: 40 }}>
            <span className={styles['chapter-synopsis-label']}>Today · {todayKey}</span>
            {todaysMemories.map((m, i) => (
              <p key={i} style={{ marginTop: i > 0 ? 12 : 0 }}>{m.year} — {m.body}</p>
            ))}
          </div>
        ) : (
          <div className={styles['empty-notice']} style={{ marginBottom: 40 }}>
            <div className={styles['empty-notice-icon']}>◐</div>
            <h4>Nothing logged for today</h4>
            <p>But there are {ON_THIS_DAY.length} other days below.</p>
          </div>
        )}

        <div className={styles['rows-list']}>
          {ON_THIS_DAY.map((m, i) => (
            <div key={i} className={styles['list-entry']}>
              <span className={styles['list-entry-date']}>{m.date} · {m.year}</span>
              <div className={styles['list-entry-body']}>{m.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
