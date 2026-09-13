export default function manifest() {
  return {
    name: 'The Last Ever Apology, Truly',
    short_name: 'TLEA',
    description: 'A private book, written for one.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF8EE',
    theme_color: '#DFA6AE',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
