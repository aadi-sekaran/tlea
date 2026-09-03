import Link from 'next/link';
import styles from '../../v35.module.css';
import { PLACES } from '@/lib/content';

export default function PlacesV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Places</div>
        <h1 className={styles['page-title']}>A Dublin <em>map</em></h1>
        <p className={styles['page-sub']}>— {PLACES.length} places, ours —</p>
        <div className={styles['rows-list']}>
          {PLACES.map((p, i) => (
            <div key={p.name} className={styles['list-entry']}>
              <span className={styles['list-entry-date']}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles['list-entry-body']}>
                <strong style={{ color: 'var(--wine)', fontFamily: 'var(--display)', fontStyle: 'italic' }}>{p.name}</strong>
                {p.note && <><br />{p.note}</>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
