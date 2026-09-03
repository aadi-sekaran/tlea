import Link from 'next/link';
import styles from '../../v35.module.css';

export default function QuizV35() {
  return (
    <div>
      <Link href="/preview-v35/book" className={styles['back-btn']}>Back</Link>
      <div className={styles.page}>
        <div className={styles['page-eyebrow']}>A small test</div>
        <h1 className={styles['page-title']}>Things only <em>we</em> know</h1>
        <div className={styles['empty-notice']}>
          <div className={styles['empty-notice-icon']}>?</div>
          <h4>12 quiz questions plus a Line and Reply page</h4>
          <p>
            Sample: <em>What did we order the first night in the apartment, before the furniture arrived?</em>
            <br /><br />
            <em>Full quiz coming.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
