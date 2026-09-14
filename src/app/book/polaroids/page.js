import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import PolaroidLightbox from '@/components/PolaroidLightbox';
import { HEADER_ART, LOADING_ART } from '@/lib/dragons';
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
        <BackToContents />
        <span className="nav-title">Polaroids</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.polaroids} alt="" className="content-header-art" />
        <p className="content-eyebrow">moments printed</p>
        <h1 className="content-title">Polaroids</h1>
        {polaroids.length === 0 ? (
          <div className="empty-state">
            <SafeImg srcs={LOADING_ART} alt="" className="empty-state-art" />
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
