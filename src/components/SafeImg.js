'use client';

import { useState } from 'react';

// Renders the first working image from `srcs` (in order). If every candidate
// 404s, renders nothing (or `textFallback`, when given) instead of a broken
// image icon. Needed because dragon assets are still trickling in.
export default function SafeImg({ srcs, src, alt = '', className, style, textFallback = null }) {
  const candidates = srcs || (src ? [src] : []);
  const [i, setI] = useState(0);

  if (i >= candidates.length) {
    return textFallback ? <span className={className}>{textFallback}</span> : null;
  }

  return (
    <img
      src={candidates[i]}
      alt={alt}
      className={className}
      style={style}
      onError={() => setI(n => n + 1)}
    />
  );
}
