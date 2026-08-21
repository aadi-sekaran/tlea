import { SONGS } from '@/lib/content';
import BackButton from '@/components/BackButton';
import Image from 'next/image';

export default function Songs() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Ours</div>
        <h1 className="section-title">Thirteen <em>songs</em></h1>
        <p className="section-subtitle">— the ones we own —</p>

        {SONGS.map(s => (
          <div key={s.trackId} className="song-card">
            <div className="song-title">
              {s.title}{s.subtitle && <em>— {s.subtitle}</em>}
            </div>
            {s.badge && <span className="song-badge">{s.badge}</span>}
            <div className="spotify-embed">
              <iframe
                src={`https://open.spotify.com/embed/track/${s.trackId}?utm_source=generator&theme=0`}
                height="80"
                allow="encrypted-media"
                loading="lazy"
              />
            </div>
            <div className="annotations">
              <div className="annotation">
                <div className="who">
                  <span className="inline-dragon"><Image src="/dragon-dark.webp" alt="" width={18} height={18} /></span>
                  Ammu says
                </div>
                <p className="body">{s.aadi}</p>
              </div>
              <div className="annotation her empty">
                <div className="who">
                  <span className="inline-dragon"><Image src="/dragon-light.webp" alt="" width={18} height={18} /></span>
                  Ammu says
                </div>
                <p className="body">— she&apos;ll write hers here —</p>
              </div>
            </div>
          </div>
        ))}

        <p className="songs-footnote">The thirteenth has its own page. Find it in the contents.</p>
      </div>
    </section>
  );
}
