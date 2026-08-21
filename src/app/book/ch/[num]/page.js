import { CHAPTERS, APOLOGY } from '@/lib/content';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CHAPTERS.map(c => ({ num: String(c.num) }));
}

export default function Chapter({ params }) {
  const num = parseInt(params.num, 10);
  const ch = CHAPTERS.find(c => c.num === num);
  if (!ch) notFound();

  const prev = num > 1 ? num - 1 : null;
  const next = num < 7 ? num + 1 : null;

  // Chapter VII: apology treatment
  if (ch.isApology) {
    return (
      <section className="screen apology-screen active has-back">
        <BackButton />
        <div className="apology-eyebrow">— Chapter Seven —</div>
        <h2 className="apology-title">The Final <em>Few Months</em></h2>
        <div className="apology-synopsis-wrap">
          <div className="apology-synopsis-date">— July 2026 — Iceland —</div>
          <div className="apology-synopsis">
            <span className="apology-synopsis-label">Synopsis</span>
            <div className="apology-synopsis-text">{ch.synopsis}</div>
          </div>
        </div>
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
      </section>
    );
  }

  return (
    <section className="screen chapter-screen active has-back">
      <BackButton />
      <div className="chapter-inner">
        <div className="chapter-header">
          <div className={`chapter-color-band band-${ch.palette}`}></div>
          <div className="chapter-num">Chapter {ch.roman}</div>
          <h2 className="chapter-title" dangerouslySetInnerHTML={{ __html: ch.title }} />
          <div className="chapter-date">{ch.date}</div>
        </div>

        <div className="synopsis-box">
          <span className="synopsis-label">Synopsis</span>
          <div className="synopsis-text">{ch.synopsis}</div>
        </div>

        <div className="painting-frame">
          <div className="painting-label">
            {ch.photo ? <>{ch.photo}.HEIC<br /><span style={{opacity:0.7}}>painted, from Drive</span></> : <>[ your Chapter {ch.roman} photo ]<br /><span style={{opacity:0.7}}>painted, from Drive</span></>}
          </div>
        </div>
        {ch.caption && <p className="painting-caption">{ch.caption}</p>}

        {ch.isExample && <span className="example-tag">Example prose · replace when ready</span>}
        <div className="chapter-prose" dangerouslySetInnerHTML={{ __html: ch.prose }} />

        <div className="placard">
          <div className="placard-head">— to be continued —</div>
          <div className="placard-body">{ch.placard}</div>
        </div>

        <div className="chapter-nav">
          {prev ? <Link href={`/book/ch/${prev}`}>← Chapter {prev}</Link> : <span />}
          <span className="center">Chapter {ch.roman}</span>
          {next ? <Link href={`/book/ch/${next}`}>Chapter {next} →</Link> : <span />}
        </div>
      </div>
    </section>
  );
}
