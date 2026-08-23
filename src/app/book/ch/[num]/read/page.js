import { CHAPTERS, APOLOGY } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CHAPTERS.map(c => ({ num: String(c.num) }));
}

export default function Reader({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = num > 1 ? num - 1 : null;
  const next = num < 7 ? num + 1 : null;

  return (
    <div className={`reader palette-${ch.palette}`}>
      <Link href={`/book/ch/${num}`} className="reader-back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3 L4 7 L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back
      </Link>

      <div className="reader-inner">
        <div className="reader-eyebrow">Chapter {ch.roman}</div>
        <h1 className="reader-title" dangerouslySetInnerHTML={{ __html: ch.title }} />
        <div className="reader-date">— {ch.date} —</div>

        {ch.isApology ? (
          <div className="apology-prose">
            {APOLOGY.map((p, i) => <p key={i}>{p}</p>)}
            <div className="apology-signoff">
              Signing off as tears roll from my eyes<br />
              for losing the beauty, and emptying my life.<br /><br />
              Forever yours, and only yours,<br />
              Your Ammu <span className="inline-dragon"><Image src="/dragon-dark.webp" alt="" width={26} height={26} /></span>
            </div>
            <div className="apology-ps">PS. This site will be here for us as long as you want. If you want it taken down, just let me know.</div>
          </div>
        ) : (
          <>
            <div className="reader-prose" dangerouslySetInnerHTML={{ __html: ch.prose }} />
            <div className="reader-placard">
              <div className="reader-placard-head">— to be continued —</div>
              <div className="reader-placard-body">{ch.placard}</div>
            </div>
          </>
        )}

        <div className="reader-nav">
          {prev ? <Link href={`/book/ch/${prev}/read`}>← Chapter {prev}</Link> : <span />}
          <Link href="/book" className="center">Contents</Link>
          {next ? <Link href={`/book/ch/${next}/read`}>Chapter {next} →</Link> : <span />}
        </div>
      </div>
    </div>
  );
}
