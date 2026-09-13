import { CHAPTERS } from '@/lib/content';
import { getChapterPortraits } from '@/lib/chapterPhotos';
import BookHome from '@/components/BookHome';

export default function BookPage() {
  const chapterPhotos = {};
  for (const ch of CHAPTERS) {
    chapterPhotos[ch.num] = getChapterPortraits(ch.num);
  }

  return <BookHome chapterPhotos={chapterPhotos} />;
}
