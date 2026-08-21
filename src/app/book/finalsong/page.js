import BackButton from '@/components/BackButton';
import { FINAL_SONG } from '@/lib/content';

export default function FinalSong() {
  return (
    <section className="screen final-song-screen active has-back">
      <BackButton />
      <div className="final-song-eyebrow">— the closing note —</div>
      <h2 className="final-song-title" dangerouslySetInnerHTML={{ __html: FINAL_SONG.title }} />
      <div className="final-song-embed">
        <div className="spotify-embed">
          <iframe
            src={`https://open.spotify.com/embed/track/${FINAL_SONG.trackId}?utm_source=generator&theme=0`}
            height="152"
            allow="encrypted-media"
            loading="lazy"
          />
        </div>
      </div>
      <p className="final-song-note">— I&apos;ll write this one on the morning of the reveal, after thirty days of building its meaning with you.</p>
    </section>
  );
}
