// Reads /public/audio/voicenotes/ for voice note recordings at request time.
// Drop any .mp3/.m4a/.wav/.ogg/.aac file in that folder and it shows up here
// automatically - no code changes needed.
import fs from 'fs';
import path from 'path';

const AUDIO_EXT_RE = /\.(mp3|m4a|wav|ogg|aac)$/i;

export function getVoiceNotes() {
  try {
    const dir = path.join(process.cwd(), 'public', 'audio', 'voicenotes');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => AUDIO_EXT_RE.test(f)).sort();

    // Optional /public/audio/voicenotes/captions.json, same pattern as
    // polaroids: { "filename.m4a": "a caption" } or
    // { "filename.m4a": { "caption": "...", "speaker": "Krithika" } }
    let captions = {};
    const capPath = path.join(dir, 'captions.json');
    if (fs.existsSync(capPath)) {
      try {
        captions = JSON.parse(fs.readFileSync(capPath, 'utf-8'));
      } catch {}
    }

    return files.map(f => {
      const meta = captions[f] ?? captions[f.replace(/\.[^.]+$/, '')] ?? {};
      const isString = typeof meta === 'string';
      return {
        src: `/audio/voicenotes/${f}`,
        caption: isString ? meta : (meta.caption || ''),
        speaker: isString ? '' : (meta.speaker || '')
      };
    });
  } catch {
    return [];
  }
}
