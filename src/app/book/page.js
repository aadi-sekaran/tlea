import { CHAPTERS } from '@/lib/content';
import { getChapterPortraits } from '@/lib/chapterPhotos';
import BookHome from '@/components/BookHome';

export default function BookPage() {
  const chapterPhotos = {};
  for (const ch of CHAPTERS) {
    // Chapter VII has no photo folder (dragon scene instead, per the plan).
    chapterPhotos[ch.num] = ch.num === 7 ? [] : getChapterPortraits(ch.num);
  }

  return <BookHome chapterPhotos={chapterPhotos} />;
}
