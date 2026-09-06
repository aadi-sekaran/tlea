import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
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
        <NavAvatar />
      </div>
      <div className="content-page">
        {/* asset: public/dragons/03_Stickers_Pack/stickers_050.png */}
        <img className="content-header-art" src="/dragons/03_Stickers_Pack/stickers_050.png" alt="" />
        <p className="content-eyebrow">moments printed</p>
        <h1 className="content-title">Polaroids</h1>
        {polaroids.length === 0 ? (
          <div className="empty-state">
            {/* asset: public/dragons/01_Main_Pack/main_001.png */}
            <img className="empty-state-art" src="/dragons/01_Main_Pack/main_001.png" alt="" />
            <p className="empty-state-text">
              The polaroids are being photographed. Come back soon.
            </p>
          </div>
        ) : (
          <PolaroidLightbox polaroids={polaroids} />
        )}
      </div>
    </div>
  );
}
