import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from '../../v35.module.css';

function getPolaroids() {
  try {
    const dir = path.join(process.cwd(), 'public', 'polaroids');
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
    let captions = {};
    const capPath = path.join(dir, 'captions.json');
    if (fs.existsSync(capPath)) {
      try { captions = JSON.parse(fs.readFileSync(capPath, 'utf-8')); } catch {}
    }
    return files.map(f => ({ src: `/polaroids/${f}`, caption: captions[f] || captions[f.replace(/\.[^.]+$/, '')] || '' }));
  } catch {
    return [];
  }
}

export default function PolaroidsV35() {
  const polaroids = getPolaroids();

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={`${styles.page} ${styles['page-wide']}`}>
        <div className={styles['page-eyebrow']}>Polaroids</div>
        <h1 className={styles['page-title']}>The <em>real</em> ones</h1>
        <p className={styles['page-sub']}>— printed moments —</p>

        {polaroids.length === 0 ? (
          <div className={styles['empty-notice']}>
            <div className={styles['empty-notice-icon']}>▢</div>
            <h4>Waiting for uploads</h4>
            <p>Photograph, upload to <em>/public/polaroids/</em>, they appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 18 }}>
            {polaroids.map(p => (
              <div key={p.src} style={{ background: 'var(--ivory)', padding: '10px 10px 24px', boxShadow: '0 8px 20px rgba(46,59,84,0.12)', borderRadius: 4 }}>
                <div style={{ aspectRatio: '4/5', backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 8 }} />
                {p.caption && <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 13, color: 'var(--wine)', textAlign: 'center' }}>{p.caption}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
