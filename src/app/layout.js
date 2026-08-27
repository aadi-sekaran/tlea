import './globals.css';
import BgMusicPlayer from '@/components/BgMusicPlayer';

export const metadata = {
  title: 'The Last Ever Apology, Truly',
  description: 'A private book, written for one.',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BgMusicPlayer />
      </body>
    </html>
  );
}
