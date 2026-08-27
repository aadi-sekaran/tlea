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

// Chapter poster fallbacks (when a chapter has no painted hero yet)
export const CHAPTER_POSTER_FALLBACKS = {
  1: '/dragons/pack-main.svg',
  2: '/dragons/pack-story.svg',
  3: '/dragons/pack-stickers.svg',
  4: '/dragons/pack-flying.svg',
  5: '/dragons/pack-main.svg',
  6: '/dragons/pack-story.svg',
  7: '/dragons/pack-main.svg'
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
