import { TRIPS } from '@/lib/content';
import BackButton from '@/components/BackButton';

export default function Trips() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Trips</div>
        <h1 className="section-title">Four we <em>took</em></h1>
        <p className="section-subtitle">— including one we are on right now —</p>

        <div className="trips-grid">
          {TRIPS.map(t => (
            <div key={t.name} className={`trip ${t.final ? 'final' : ''}`}>
              <div className="trip-stamp">{t.stamp}</div>
              <div>
                <div className="trip-name" dangerouslySetInnerHTML={{ __html: t.name }} />
                <div className="trip-note">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
