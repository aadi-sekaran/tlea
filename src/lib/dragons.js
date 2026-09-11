// Dragon asset paths. Multiple sticker sheets live in /public/dragons/.
// This registry maps semantic names to SVG paths for use throughout the app.

export const DRAGON_ASSETS = {
  // Login screen dark + light dragon head portraits
  loginPortraits: '/dragons/dragons-login.png',

  // Master sticker sheets (used as backgrounds or referenced by CSS)
  packMain: '/dragons/pack-main.svg',
  packFlying: '/dragons/pack-flying.svg',
  packStory: '/dragons/pack-story.svg',
  packStickers: '/dragons/pack-stickers.svg'
};

// Chapter poster fallbacks (when a chapter has no heroImg/posterImg set at all).
// Single illustrations, not the raw multi-icon sprite sheets (pack-*.svg) —
// those are contact-sheet-style source files, not usable as one image.
export const CHAPTER_POSTER_FALLBACKS = {
  1: '/dragons/01_Main_Pack/main_007.png',
  2: '/dragons/01_Main_Pack/main_007.png',
  3: '/dragons/01_Main_Pack/main_007.png',
  4: '/dragons/01_Main_Pack/main_007.png',
  5: '/dragons/01_Main_Pack/main_007.png',
  6: '/dragons/01_Main_Pack/main_007.png',
  7: '/dragons/01_Main_Pack/main_065.png'
};

// Section-tile art on the browse home, keyed by each section's `dragon` hint
// in content.js (SECTIONS). One distinct, thematically-matched illustration
// per tile — never the raw pack-*.svg contact sheets.
export const SECTION_TILE_ART = {
  letter: '/dragons/03_Stickers_Pack/stickers_011.png',   // Foreword — dragon holding a letter
  hug: '/dragons/03_Stickers_Pack/stickers_012.png',      // Cast — two dragons side by side
  note: '/dragons/03_Stickers_Pack/stickers_060.png',     // Songs — music note
  stars: '/dragons/01_Main_Pack/main_099.png',            // Watched — moon + star
  nest: '/dragons/03_Stickers_Pack/stickers_042.png',     // Places — flowers
  adventure: '/dragons/01_Main_Pack/main_080.png',        // Trips — adventure box
  bubble: '/dragons/01_Main_Pack/main_017.png',           // Dictionary — question bubble
  clock: '/dragons/02_Flying_Poses/flying_004.png',       // Firsts & Lasts — dragon in motion
  heart: '/dragons/01_Main_Pack/main_047.png',            // Ledger — heart
  moon: '/dragons/01_Main_Pack/main_062.png',             // On This Day — crescent moon
  bubble2: '/dragons/01_Main_Pack/main_064.png',          // Line and Reply — chat bubble
  stamp: '/dragons/03_Stickers_Pack/stickers_050.png',    // Polaroids — polaroid-shaped sticker
  jar: '/dragons/03_Stickers_Pack/stickers_030.png',      // Time Capsule — jar of stars
  sunset: '/dragons/01_Main_Pack/main_066.png',           // Final Song — night sky scene
  sleeping: '/dragons/02_Flying_Poses/flying_012.png'     // Release — a dragon flying off
};

// ═══════════════════════════════════════════════════════════════════
// Dragon batch 2 — public/dragons/scenes/. 18 delivered so far, 28 more
// trickling in over the next 48 hours. Every lookup below is a candidate
// list: use with <SafeImg srcs={...} /> so a missing file just falls
// back down the chain instead of breaking the page.
// ═══════════════════════════════════════════════════════════════════

export const COVER_ENVELOPE = ['/dragons/scenes/cover-envelope.png', '/dragons/01_Main_Pack/main_074.png'];

// Small top-left icon per section tile on the browse home, keyed by SECTIONS slug.
export const TILE_ICON_ART = {
  cast: ['/dragons/scenes/tile-icon-cast.png'],
  songs: ['/dragons/scenes/tile-icon-songs.png'],
  watched: ['/dragons/scenes/tile-icon-watched.png'],
  places: ['/dragons/scenes/tile-icon-places.png'],
  trips: ['/dragons/scenes/tile-icon-trips.png'],
  dictionary: ['/dragons/scenes/tile-icon-dictionary.png'],
  firsts: ['/dragons/scenes/tile-icon-firsts.png'],
  ledger: ['/dragons/scenes/tile-icon-ledger.png'],
  onthisday: ['/dragons/scenes/tile-icon-ontd.png'],
  polaroids: ['/dragons/scenes/tile-icon-polaroids.png'],
  timecapsule: ['/dragons/scenes/tile-icon-timecapsule.png'],
  finalsong: ['/dragons/scenes/tile-icon-finalsong.png']
  // foreword, lineandreply, release: no tile icon yet, tile renders without one.
};

// Divider between the chapter synopsis and the prose, keyed by chapter num.
export const CHAPTER_MARKS = {
  1: ['/dragons/scenes/chapter-01-mark.png'],
  2: ['/dragons/scenes/chapter-02-mark.png'],
  3: ['/dragons/scenes/chapter-03-mark.png'],
  4: ['/dragons/scenes/chapter-04-mark.png'],
  5: ['/dragons/scenes/chapter-05-mark.png'],
  6: ['/dragons/scenes/chapter-06-mark.png'],
  7: ['/dragons/scenes/chapter-07-mark.png']
};

export const FAREWELL_SIGNOFF_ART = [
  '/dragons/scenes/farewell-hero.png',
  '/dragons/scenes/farewell-outro.png',
  '/dragons/scenes/finalsong-cliff.png'
];

export const TIMECAPSULE_SEALED_ART = ['/dragons/scenes/timecapsule-sealed.png', '/dragons/01_Main_Pack/main_067.png'];
export const RELEASE_HERO_ART = ['/dragons/scenes/release-flying.png', '/dragons/02_Flying_Poses/flying_012.png'];
export const FINALSONG_HERO_ART = ['/dragons/scenes/finalsong-cliff.png'];

export const HEADER_ART = {
  onthisday: ['/dragons/scenes/ontd-header.png', '/dragons/01_Main_Pack/main_062.png'],
  watched: ['/dragons/scenes/watched-header.png', '/dragons/01_Main_Pack/main_099.png'],
  dictionary: ['/dragons/scenes/dictionary-header.png', '/dragons/01_Main_Pack/main_017.png'],
  trips: ['/dragons/scenes/trips-header.png', '/dragons/01_Main_Pack/main_080.png']
};

export const ERROR_ART = ['/dragons/scenes/error-oops.png'];
export const LOADING_ART = ['/dragons/scenes/loading-flying.png', '/dragons/02_Flying_Poses/flying_001.png'];
