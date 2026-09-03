import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../../v35.module.css';
import { CHAPTER_META_V35, CH1_SYNOPSIS, CH1_PAINTING_CAPTION, CH1_PROSE, CH1_PLACARD, CH_COMING_PLACARD, APOLOGY_V35 } from '@/content/locked-v35';
import { CHAPTERS } from '@/lib/content';

export function generateStaticParams() {
  return CHAPTER_META_V35.map(c => ({ num: String(c.num) }));
}

export default function ChapterV35({ params }) {
  const num = parseInt(params.num, 10);
  const meta = CHAPTER_META_V35.find(c => c.num === num);
  if (!meta) notFound();
  const stageData = CHAPTERS.find(c => c.num === num);

  if (num === 7) {
    return (
      <div>
        <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
        <div className={styles.apology}>
          <div className={styles['apology-inner']}>
            <div className={styles['apology-eyebrow']}>{APOLOGY_V35.eyebrow}</div>
            <h1 className={styles['apology-title']}>{APOLOGY_V35.titlePre}<em>{APOLOGY_V35.titleEm}</em></h1>
            <div className={styles['apology-body']}>
              {APOLOGY_V35.body.map((p, i) => <p key={i}>{p}</p>)}
              <div className={styles['apology-signoff']}>
                {APOLOGY_V35.signoffLines.map((line, i) => (
                  <span key={i}>{line}{i < APOLOGY_V35.signoffLines.length - 1 ? <br /> : null}</span>
                ))}
              </div>
              <div className={styles['apology-ps']}>{APOLOGY_V35.ps}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['chapter-page']}>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={`${styles['chapter-hero']} ${styles[`c${num}`]}`}>
        <div className={styles['chapter-num']}>Chapter {meta.romanNum}</div>
        <h1 className={styles['chapter-title']}>{meta.titlePlain}<em>{meta.titleEm}</em></h1>
        <div className={styles['chapter-date']}>{meta.dates}</div>
      </div>
      <div className={styles['chapter-body']}>
        {num === 1 && (
          <>
            <div className={styles['chapter-synopsis']}>
              <span className={styles['chapter-synopsis-label']}>Synopsis</span>
              {CH1_SYNOPSIS}
            </div>
            <div
              className={`${styles['painting-frame']} ${stageData?.heroImg ? styles['has-image'] : ''}`}
              style={stageData?.heroImg ? { backgroundImage: `url(${stageData.heroImg})` } : undefined}
            >
              {!stageData?.heroImg && <>IMG_2278.HEIC<br />the first ever photo of us, painted</>}
            </div>
            <p className={styles['painting-caption']}>{CH1_PAINTING_CAPTION}</p>
            <div className={styles['chapter-prose']}>
              {CH1_PROSE.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className={styles.placard}>
              <div className={styles['placard-head']}>{CH1_PLACARD.head}</div>
              <div className={styles['placard-body']}>{CH1_PLACARD.body}</div>
            </div>
          </>
        )}
        {num !== 1 && (
          <div className={styles.placard}>
            <div className={styles['placard-head']}>{CH_COMING_PLACARD.head}</div>
            <div className={styles['placard-body']}>{CH_COMING_PLACARD.body}</div>
          </div>
        )}
      </div>
    </div>
  );
}
