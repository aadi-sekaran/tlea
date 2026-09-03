import Link from 'next/link';
import styles from '../../v35.module.css';
import { DICTIONARY } from '@/lib/content';

export default function DictionaryV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>Dictionary of us</div>
        <h1 className={styles['page-title']}>Words only <em>we</em> know</h1>
        <p className={styles['page-sub']}>— the private slang —</p>
        {DICTIONARY.map(shelf => (
          <div key={shelf.shelf} className={styles.shelf}>
            <div className={styles['shelf-title']}>{shelf.shelf}</div>
            {shelf.entries.map(e => (
              <div key={e.term} className={styles['dict-entry']}>
                <div className={styles['dict-term']}>{e.term}</div>
                {e.def && <div className={styles['dict-def']}>{e.def}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
