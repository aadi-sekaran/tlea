import Link from 'next/link';
import SafeImg from '@/components/SafeImg';
import { COVER_ENVELOPE } from '@/lib/dragons';

export default function CoverPage() {
  return (
    <div className="cover">
      <div className="cover-inner">
        <div className="cover-envelope">
          <SafeImg srcs={COVER_ENVELOPE} alt="A sealed envelope" />
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
