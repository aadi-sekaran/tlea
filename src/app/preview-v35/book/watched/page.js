import Link from 'next/link';
import styles from '../../v35.module.css';
import { FILMS, SERIES } from '@/lib/content';

export default function WatchedV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={`${styles.page} ${styles['page-wide']}`}>
        <div className={styles['page-eyebrow']}>Watched together</div>
        <h1 className={styles['page-title']}>Films &amp; <em>series</em></h1>
        <p className={styles['page-sub']}>— {FILMS.length} films, {SERIES.length} series —</p>

        <div className={styles.shelf}>
          <div className={styles['shelf-title']}>Series</div>
          {SERIES.map(s => (
            <div key={s.name} className={styles['dict-entry']}>
              <div className={styles['dict-term']}>{s.name}</div>
              {s.note && <div className={styles['dict-def']}>{s.note}</div>}
            </div>
          ))}
        </div>

        <div className={styles.shelf}>
          <div className={styles['shelf-title']}>Films</div>
          {FILMS.map(f => (
            <div key={f.name} className={styles['dict-entry']}>
              <div className={styles['dict-term']}>{f.name}</div>
              {f.note && <div className={styles['dict-def']}>{f.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
