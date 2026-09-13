// Reads /public/photos/tlea-photo/ch-0N/ for a chapter's photos at build time.
// Hero.jpg is the static poster shot (not part of the rotation). n1.jpg,
// n2.jpg, ... are the auto-rotating carousel images.
import fs from 'fs';
import path from 'path';

const IMG_EXT = 'jpe?g|png|webp';

export function getChapterPhotos(chapterNum) {
  try {
    const folder = `ch-${String(chapterNum).padStart(2, '0')}`;
    const dir = path.join(process.cwd(), 'public', 'photos', 'tlea-photo', folder);
    if (!fs.existsSync(dir)) return { hero: null, rotation: [] };

    const files = fs.readdirSync(dir);
    const heroRe = new RegExp(`^hero\\.(${IMG_EXT})$`, 'i');
    const rotationRe = new RegExp(`^n(\\d+)\\.(${IMG_EXT})$`, 'i');

    const heroFile = files.find(f => heroRe.test(f));
    const hero = heroFile ? `/photos/tlea-photo/${folder}/${heroFile}` : null;

    const rotation = files
      .filter(f => rotationRe.test(f))
      .sort((a, b) => parseInt(a.match(rotationRe)[1], 10) - parseInt(b.match(rotationRe)[1], 10))
      .map(f => `/photos/tlea-photo/${folder}/${f}`);

    return { hero, rotation };
  } catch {
    return { hero: null, rotation: [] };
  }
}

// Convenience for callers that just want a flat list of images to rotate
// through (the browse-home hero banner and chapter posters), rather than
// the strict hero-then-carousel split used on the chapter detail page.
export function getChapterPortraits(chapterNum) {
  const { hero, rotation } = getChapterPhotos(chapterNum);
  return hero ? [hero, ...rotation] : rotation;
}
