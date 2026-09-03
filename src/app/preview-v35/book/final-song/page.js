import Link from 'next/link';
import styles from '../../v35.module.css';
import { FINAL_SONG_V35 } from '@/content/locked-v35';

export default function FinalSongV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>{FINAL_SONG_V35.eyebrow}</div>
        <h1 className={styles['page-title']}>{FINAL_SONG_V35.titlePre}<em>{FINAL_SONG_V35.titleEm}</em></h1>
        <p className={styles['page-sub']}>{FINAL_SONG_V35.sub}</p>
        <div className={styles['spotify-embed']} style={{ maxWidth: 460, margin: '0 auto 30px' }}>
          <iframe
            src={`https://open.spotify.com/embed/track/${FINAL_SONG_V35.spotifyId}?utm_source=generator&theme=0`}
            height="152"
            allow="encrypted-media"
            loading="lazy"
            title={FINAL_SONG_V35.titleEm}
          />
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'var(--hand)', fontSize: 22, color: 'var(--brown)', maxWidth: 400, margin: '0 auto', lineHeight: 1.5 }}>
          {FINAL_SONG_V35.note}
        </p>
      </div>
    </div>
  );
}
