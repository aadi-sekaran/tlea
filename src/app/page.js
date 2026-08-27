import Link from 'next/link';

export default function CoverPage() {
  return (
    <div className="cover">
      <div className="cover-inner">
        <div className="cover-envelope">
          <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
            {/* Envelope body */}
            <rect x="10" y="30" width="220" height="140" rx="6" fill="#F7EEDF" stroke="#8A6F61" strokeWidth="2" />
            {/* Flap */}
            <path d="M 10 36 L 120 110 L 230 36" fill="none" stroke="#8A6F61" strokeWidth="2" />
            {/* Wax seal */}
            <circle cx="120" cy="110" r="24" fill="#DFA6AE" stroke="#8A6F61" strokeWidth="2" />
            <text x="120" y="118" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="16" fill="#FFF8EE">A + K</text>
          </svg>
        </div>
        <h1 className="cover-title">The Last Ever Apology, Truly</h1>
        <p className="cover-sub">a private book, written for one</p>
        <Link href="/login" className="cover-cta">
          Open →
        </Link>
      </div>
    </div>
  );
}
