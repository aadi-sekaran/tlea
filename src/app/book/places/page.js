import { PLACES } from '@/lib/content';
import BackButton from '@/components/BackButton';

export default function Places() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Places</div>
        <h1 className="section-title">A map of <em>us</em></h1>
        <p className="section-subtitle">— in Dublin, mostly —</p>

        <div className="map-frame">
          {[[45,40],[30,55],[55,60],[65,45],[40,65]].map(([t,l], i) => (
            <div key={i} className="map-pin" style={{ top: `${t}%`, left: `${l}%` }} />
          ))}
          <div className="map-note">an illustrated Dublin map with pins<br />coming in the next build</div>
        </div>

        <ul className="places-list">
          {PLACES.map(p => (
            <li key={p.name} className="place">
              {p.name}
              {p.note && <span className="place-note">{p.note}</span>}
            </li>
          ))}
        </ul>

        <p className="places-tail">and so much more that we don&apos;t even remember</p>
      </div>
    </section>
  );
}
