import { Fraunces, Inter, Caveat } from 'next/font/google';
import styles from './v35.module.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fraunces-v35',
  display: 'swap'
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-v35',
  display: 'swap'
});
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-caveat-v35',
  display: 'swap'
});

export const metadata = {
  title: 'For Ammu — preview',
  robots: { index: false, follow: false }
};

export default function PreviewV35Layout({ children }) {
  return (
    <div className={`${styles.stage} ${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      {children}
    </div>
  );
}
