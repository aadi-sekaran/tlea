import Link from 'next/link';

export default function CoverPage() {
  return (
    <div className="cover">
      <div className="cover-inner">
        <div className="cover-envelope">
          {/* asset: public/dragons/01_Main_Pack/main_074.png (envelope + heart wax seal) */}
          <img src="/dragons/01_Main_Pack/main_074.png" alt="A sealed envelope" />
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
