import Link from 'next/link';
import LineAndReplyCard from '@/components/LineAndReplyCard';
import { LINE_AND_REPLY } from '@/lib/content';

export default function LineAndReplyPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <Link href="/book" className="nav-back">← contents</Link>
        <span className="nav-title">The Line and the Reply</span>
        <span />
      </div>
      <LineAndReplyCard exchanges={LINE_AND_REPLY} />
    </div>
  );
}
