import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import PlacesMap from '@/components/PlacesMap';
import { PLACES } from '@/lib/content';

export default function PlacesPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">Our Places</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        {/* asset: public/dragons/03_Stickers_Pack/stickers_042.png */}
        <img className="content-header-art" src="/dragons/03_Stickers_Pack/stickers_042.png" alt="" />
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
