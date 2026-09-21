import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import WatchedGrid from '@/components/WatchedGrid';
import { FILMS, SERIES } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';
import posters from '@/lib/posters.generated.json';

export default function WatchedPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">What We Watched</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.watched} alt="" className="content-header-art" />
        <p className="content-eyebrow">films and series we lived inside</p>
        <h1 className="content-title">What We Watched</h1>

        <h2 className="watched-section-title">Films</h2>
        <WatchedGrid baseItems={FILMS} posters={posters.films} kind="film" addLabel="add a movie" />

        <h2 className="watched-section-title" style={{ marginTop: '3rem' }}>Series</h2>
        <WatchedGrid baseItems={SERIES} posters={posters.series} kind="series" addLabel="add a series" />
      </div>
    </div>
  );
}
