import Link from 'next/link';
import { readSession } from '@/lib/session';
import { getMyLetter } from '@/lib/timecapsule';
import TimeCapsuleSeal from '@/components/TimeCapsuleSeal';

export default async function TimeCapsulePage() {
  const session = await readSession();
  const author = session?.role;
  const myLetter = author ? await getMyLetter(author) : null;

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Time Capsule</span>
        <span />
      </div>
      <div className="tc-shell">
        <p className="content-eyebrow">a letter for a year from now</p>
        <h1 className="content-title">Time Capsule</h1>
        <p style={{ color: 'var(--text)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Write one letter to open together on September 19, 2027. Sealed the moment you save it.
          Yours stays yours until then. So does mine.
        </p>
        <TimeCapsuleSeal
          author={author}
          existingLetter={myLetter}
          unlocksOn="September 19, 2027"
        />
      </div>
    </div>
  );
}
