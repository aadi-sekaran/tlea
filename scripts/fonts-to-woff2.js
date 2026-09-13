#!/usr/bin/env node
// Converts every .otf/.ttf in public/fonts/ to a same-named .woff2 file
// alongside it (originals are left in place, untouched, as a fallback).
// Same font, same weights/styles, ~50%+ smaller and Brotli-compressed.
// Run with: node scripts/fonts-to-woff2.js
// Requires: python3 -m pip install fonttools brotli

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

const PY_SCRIPT = `
import sys
from fontTools.ttLib import TTFont
src, dst = sys.argv[1], sys.argv[2]
f = TTFont(src)
f.flavor = 'woff2'
f.save(dst)
`;

function convert(file) {
  const src = path.join(FONTS_DIR, file);
  const dst = path.join(FONTS_DIR, file.replace(/\.(otf|ttf)$/i, '.woff2'));
  execFileSync('python3', ['-c', PY_SCRIPT, src, dst]);
  return { src, dst };
}

function formatBytes(n) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const files = fs.readdirSync(FONTS_DIR).filter(f => /\.(otf|ttf)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = fs.statSync(path.join(FONTS_DIR, file)).size;
  const { dst } = convert(file);
  const after = fs.statSync(dst).size;
  totalBefore += before;
  totalAfter += after;
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(`${file}: ${formatBytes(before)} -> ${formatBytes(after)} (-${pct}%)`);
}

console.log('');
console.log(`Files converted: ${files.length}`);
console.log(`Total before: ${formatBytes(totalBefore)}`);
console.log(`Total after:  ${formatBytes(totalAfter)}`);
console.log(`Saved (per full set, actual per-page saving depends on which weights are used): ${formatBytes(totalBefore - totalAfter)}`);
