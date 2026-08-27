import Link from 'next/link';
import PolaroidLightbox from '@/components/PolaroidLightbox';
import fs from 'fs';
import path from 'path';

// Server-side: read /public/polaroids/ to detect uploaded files.
function getPolaroids() {
  try {
    const dir = path.join(process.cwd(), 'public', 'polaroids');
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort();
    // Optional captions file: /public/polaroids/captions.json
    let captions = {};
    const capPath = path.join(dir, 'captions.json');
    if (fs.existsSync(capPath)) {
      try {
        captions = JSON.parse(fs.readFileSync(capPath, 'utf-8'));
      } catch {}
    }
    return files.map(f => ({
      src: `/polaroids/${f}`,
      caption: captions[f] || captions[f.replace(/\.[^.]+$/, '')] || ''
    }));
  } catch {
    return [];
  }
}

export default function PolaroidsPage() {
  const polaroids = getPolaroids();

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Polaroids</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">moments printed</p>
        <h1 className="content-title">Polaroids</h1>
        {polaroids.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--text-soft)', textAlign: 'center', padding: '3rem 1rem' }}>
            The polaroids are being photographed. Come back soon.
          </p>
        ) : (
          <PolaroidLightbox polaroids={polaroids} />
        )}
      </div>
    </div>
  );
}
