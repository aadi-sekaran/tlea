import Link from 'next/link';
import styles from '../../v35.module.css';
import { CAST } from '@/lib/content';

export default function CastV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Cast</div>
        <h1 className={styles['page-title']}>Two <em>Ammus</em></h1>
        <p className={styles['page-sub']}>— the dark one and the light one —</p>
        <div className={styles['rows-list']}>
          {CAST.map(c => (
            <div key={c.id} className={styles['list-entry']} style={{ gridTemplateColumns: '80px 1fr' }}>
              <span
                className={styles['profile-avatar-img']}
                style={{ width: 64, height: 64, borderRadius: 14, backgroundImage: `url(${c.dragon})`, backgroundPosition: c.dragonSide === 'dark' ? 'left center' : 'right center' }}
              />
              <div>
                <div className={styles['dict-term']} style={{ fontSize: 20 }}>{c.name} <span style={{ fontFamily: 'var(--body)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--rose-deep)' }}>{c.role}</span></div>
                <div className={styles['dict-def']}>{c.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
