// Reads /public/photos/ch-0N/ for a chapter's portrait photos at build time.
// Portrait files are named "<n>-portrait.<ext>"; landscape "<n>-landscape.<ext>" (ignored here).
import fs from 'fs';
import path from 'path';

export function getChapterPortraits(chapterNum) {
  try {
    const folder = `ch-${String(chapterNum).padStart(2, '0')}`;
    const dir = path.join(process.cwd(), 'public', 'photos', folder);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => /^\d+-portrait\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .map(f => `/photos/${folder}/${f}`);
  } catch {
    return [];
  }
}
