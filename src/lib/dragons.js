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

// Iconic scenes for section-tile decorations
export const SECTION_DRAGON_HINTS = {
  letter: 'envelope',
  hug: 'hugging',
  note: 'music',
  stars: 'stars',
  nest: 'cozy',
  adventure: 'adventure',
  bubble: 'speech',
  clock: 'time',
  heart: 'heart',
  moon: 'moon',
  bubble2: 'chat',
  stamp: 'stamp',
  jar: 'jar',
  sunset: 'sunset',
  sleeping: 'sleeping'
};
