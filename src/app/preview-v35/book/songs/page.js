import Link from 'next/link';
import styles from '../../v35.module.css';
import { SONGS_V35, SONGS_HER_PLACEHOLDER } from '@/content/locked-v35';
import { listAnnotations } from '@/lib/annotations';

export default async function SongsV35() {
  const herRows = await listAnnotations('songs');
  const herByItem = new Map();
  for (const row of herRows) {
    if (row.author === 'light' && row.item_key) herByItem.set(row.item_key, row.body);
  }

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={`${styles.page} ${styles['page-wide']}`}>
        <div className={styles['page-eyebrow']}>Ours</div>
        <h1 className={styles['page-title']}>Thirteen <em>songs</em></h1>
        <p className={styles['page-sub']}>— in the order they mean —</p>

        {SONGS_V35.map(song => {
          const herBody = herByItem.get(`song-${song.n}`);
          return (
            <div key={song.n} className={styles.song}>
              <div className={styles['song-head']}>
                <div className={styles['song-index']}>{String(song.n).padStart(2, '0')}</div>
                <div className={styles['song-meta']}>
                  <div className={styles['song-title']}>
                    {song.title}
                    {song.fromEm && <em>{song.fromEm}</em>}
                  </div>
                  {song.badge && <span className={styles['song-badge']}>{song.badge}</span>}
                </div>
              </div>
              <div className={styles['spotify-embed']}>
                <iframe
                  src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`}
                  height="80"
                  allow="encrypted-media"
                  loading="lazy"
                  title={song.title}
                />
              </div>
              <div className={styles['song-annotation']}>
                <div className={styles['song-annotation-who']}>Ammu · dark</div>
                <p className={styles['song-annotation-body']}>{song.aadi}</p>
              </div>
              <div className={`${styles['song-annotation']} ${styles.her}`}>
                <div className={styles['song-annotation-who']}>Ammu · light</div>
                <p className={styles['song-annotation-body']}>{herBody || SONGS_HER_PLACEHOLDER}</p>
              </div>
            </div>
          );
        })}

        <p style={{ textAlign: 'center', fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brown)', marginTop: 40, fontSize: 14 }}>
          The thirteenth is on its own page. <Link href="/preview-v35/book/final-song">Find it here.</Link>
        </p>
      </div>
    </div>
  );
}
