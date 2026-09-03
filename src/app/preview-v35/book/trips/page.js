import Link from 'next/link';
import styles from '../../v35.module.css';
import { TRIPS } from '@/lib/content';

export default function TripsV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Trips</div>
        <h1 className={styles['page-title']}>{TRIPS.length} we <em>took</em></h1>
        <p className={styles['page-sub']}>— one still to come —</p>
        {TRIPS.map(t => (
          <div
            key={t.name}
            className={styles['chapter-synopsis']}
            style={t.special ? { background: 'linear-gradient(135deg, var(--blush), var(--rose))', borderLeftColor: 'var(--wine)' } : undefined}
          >
            <span className={styles['chapter-synopsis-label']} style={t.special ? { color: 'var(--wine)' } : undefined}>{t.dates}</span>
            <strong style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 20, color: t.special ? 'var(--wine)' : 'var(--wine)', display: 'block', marginBottom: 6 }}>{t.name}</strong>
            {t.body}
          </div>
        ))}
      </div>
    </div>
  );
}
