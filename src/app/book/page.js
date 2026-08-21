import Link from 'next/link';

const CARDS = [
  { href: '/book/foreword', tint: 'cream', motif: '✉', title: 'The <em>Foreword</em>', sub: 'why this book' },
  { href: '/book/cast', tint: 'lavender', motif: '✦', title: 'The <em>Cast</em>', sub: 'two Ammus' },
  { href: '/book/songs', tint: 'blush', motif: '♪', title: 'Thirteen <em>Songs</em>', sub: 'ours, with meanings' },
  { href: '/book/watched', tint: 'butter', motif: '▷', title: 'Watched <em>Together</em>', sub: 'films & series' },
  { href: '/book/places', tint: 'powder', motif: '◉', title: 'Our <em>Places</em>', sub: 'a Dublin map' },
  { href: '/book/trips', tint: 'sage', motif: '✈', title: 'The <em>Trips</em>', sub: 'four we took' },
  { href: '/book/firsts', tint: 'peach', motif: '§', title: 'Firsts &amp; <em>Lasts</em>', sub: 'two columns' },
  { href: '/book/dictionary', tint: 'lavender', motif: 'A', title: 'Dictionary <em>of us</em>', sub: 'only we know' },
  { href: '/book/ledger', tint: 'cream', motif: '№', title: 'Ledger of <em>Numbers</em>', sub: 'what we counted' },
  { href: '/book/ontd', tint: 'blush', motif: '◐', title: 'On this <em>day</em>', sub: 'across three years' },
  { href: '/book/quiz', tint: 'butter', motif: '?', title: 'A little <em>quiz</em>', sub: 'things only we know' },
  { href: '/book/polaroids', tint: 'peach', motif: '▢', title: 'The <em>Polaroids</em>', sub: 'the real ones' },
  { href: '/book/timecapsule', tint: 'powder', motif: '✉', title: 'Time <em>Capsule</em>', sub: 'until Sept 19, 2027', badge: 'Sealed' },
  { href: '/book/finalsong', tint: 'rose', motif: '♥', title: 'The Final <em>Song</em>', sub: 'the closing note' },
];

export default function Contents() {
  return (
    <section className="screen contents-screen active">
      <div className="contents-inner">
        <div className="contents-head">
          <div className="contents-flourish">Table of Contents</div>
          <h1 className="contents-title">Everything, <em>in order</em></h1>
          <p className="contents-subtitle">a little book about two Ammus</p>
        </div>

        <div className="chapters-section">
          <div className="section-label">The chapters</div>
          <div className="chapter-strip">
            {[
              ['I', 'The Meeting', 'c1'],
              ['II', 'Firsts', 'c2'],
              ['III', 'Building', 'c3'],
              ['IV', 'Hustle', 'c4'],
              ['V', 'Half & Half', 'c5'],
              ['VI', 'Anyway', 'c6'],
              ['VII', 'Apology', 'c7'],
            ].map(([num, name, cls], i) => (
              <Link key={num} href={`/book/ch/${i+1}`} className={`chapter-chip ${cls}`}>
                <span className="num">{num}</span>
                <span className="name">{name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="section-label">Beyond the chapters</div>
        <div className="cards-grid">
          {CARDS.map(card => (
            <Link key={card.href} href={card.href} className={`card tint-${card.tint}`}>
              <div>
                <div className="card-motif">{card.motif}</div>
                <div className="card-title" dangerouslySetInnerHTML={{ __html: card.title }} />
                {card.badge && <span className="card-badge">{card.badge}</span>}
              </div>
              <div className="card-sub">{card.sub}</div>
            </Link>
          ))}
        </div>

        <div className="contents-footer">
          <div className="contents-footer-note">— when you are ready —</div>
          <Link href="/book/release" className="release-link">letting this go</Link>
        </div>
      </div>
    </section>
  );
}
