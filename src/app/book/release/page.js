import Link from 'next/link';
import { readSession } from '@/lib/session';
import { getReleaseStatus, daysRemaining } from '@/lib/release-timer';
import ReleaseTimer from '@/components/ReleaseTimer';

export default async function ReleasePage() {
  const session = await readSession();
  const author = session?.role;
  const timer = author ? await getReleaseStatus(author) : null;
  const days = timer ? daysRemaining(timer) : null;

  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">Release</span>
        <span />
      </div>
      <div className="release-shell">
        <p className="content-eyebrow">the way out, if you want it</p>
        <h1 className="content-title">Release</h1>
        <p className="release-explain">
          You do not have to keep this. If you want it gone, start the countdown. Thirty days.
          You can cancel it at any point. Two reminders will come to you before the day.
          When the timer ends, your profile is erased. Mine is not. This site stays as mine to look at.
          If that's not what you want either, tell me, and I will take it all down that day.
        </p>
        <ReleaseTimer initialStatus={timer} initialDays={days} />
      </div>
    </div>
  );
}
