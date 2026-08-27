import Link from 'next/link';
import { CAST } from '@/lib/content';

export default function CastPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">The Cast</span>
        <span />
      </div>
      <div className="content-page">
        <p className="content-eyebrow">two dragons, one story</p>
        <h1 className="content-title">The Cast</h1>
        <div className="cast-grid">
          {CAST.map(person => (
            <div key={person.id} className="cast-card">
              <div className="cast-dragon">
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(/dragons/dragons-login.png)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: person.dragonSide === 'dark' ? 'left center' : 'right center',
                  backgroundRepeat: 'no-repeat'
                }} />
              </div>
              <h2 className="cast-name">{person.name}</h2>
              <p className="cast-role">{person.role}</p>
              <p className="cast-bio">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
