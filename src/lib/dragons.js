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
