import Link from 'next/link';
import styles from '../../v35.module.css';
import { readSession } from '@/lib/session';
import { getMyLetter } from '@/lib/timecapsule';
import TimeCapsuleSeal from '@/components/TimeCapsuleSeal';

export default async function TimeCapsuleV35() {
  const session = await readSession();
  const author = session?.role;
  const myLetter = author ? await getMyLetter(author) : null;

  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Time capsule</div>
        <h1 className={styles['page-title']}>Sealed until <em>Sept 19, 2027</em></h1>
        <p className={styles['page-sub']}>— two letters, one date —</p>
        <p style={{ fontFamily: 'var(--body)', color: 'var(--navy)', lineHeight: 1.6, marginBottom: '2rem', textAlign: 'center' }}>
          Write one letter to open together on September 19, 2027. Sealed the moment you save it.
          Yours stays yours until then. So does mine.
        </p>
        <TimeCapsuleSeal author={author} existingLetter={myLetter} unlocksOn="September 19, 2027" />
      </div>
    </div>
  );
}
