import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import PlacesMap from '@/components/PlacesMap';
import { PLACES } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';

export default function PlacesPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">Our Places</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.places} alt="" className="content-header-art" />
        <p className="content-eyebrow">the map of Dublin, ours</p>
        <h1 className="content-title">Our Places</h1>

        <PlacesMap places={PLACES} />

        <div className="item-list">
          {PLACES.map(p => (
            <div key={p.name} className="item">
              <span className="item-name">{p.name}</span>
              {p.note && <span className="item-note">{p.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
