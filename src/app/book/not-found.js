import Link from 'next/link';
import SafeImg from '@/components/SafeImg';
import { ERROR_ART } from '@/lib/dragons';

export default function BookNotFound() {
  return (
    <div className="book-shell">
      <div className="empty-state" style={{ minHeight: '70vh', justifyContent: 'center' }}>
        <SafeImg srcs={ERROR_ART} alt="" className="empty-state-art" />
        <p className="empty-state-text">That page does not exist. Not everything is written yet.</p>
        <Link href="/book" className="chapter-nav-btn">← back to contents</Link>
      </div>
    </div>
  );
}
