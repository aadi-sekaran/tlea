import Link from 'next/link';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import { DICTIONARY } from '@/lib/content';
import { HEADER_ART } from '@/lib/dragons';

export default function DictionaryPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">The Dictionary</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.dictionary} alt="" className="content-header-art" />
        <p className="content-eyebrow">words only we use</p>
        <h1 className="content-title">The Dictionary</h1>
        {DICTIONARY.map(shelf => (
          <div key={shelf.shelf} className="dict-shelf">
            <h2 className="dict-shelf-title">{shelf.shelf}</h2>
            {shelf.entries.map(entry => (
              <div key={entry.term} className="dict-entry">
                <div className="dict-term">{entry.term}</div>
                {entry.def && <div className="dict-def">{entry.def}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
