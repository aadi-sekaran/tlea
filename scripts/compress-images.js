#!/usr/bin/env node
// Recursively compresses .jpg/.jpeg/.png photos under public/photos/ and
// public/polaroids/: resize so the long edge is at most 1600px, re-encode
// as JPEG quality 82, overwrite in place. Prints per-file and total savings.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOTS = ['public/photos', 'public/polaroids'];
const MAX_EDGE = 1600;
const JPEG_QUALITY = 82;
const EXT_RE = /\.(jpe?g|png)$/i;

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(walk(full));
    } else if (entry.isFile() && EXT_RE.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function compressFile(file) {
  const before = fs.statSync(file).size;
  const inputBuffer = fs.readFileSync(file);

  const outputBuffer = await sharp(inputBuffer)
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(file, outputBuffer);
  const after = fs.statSync(file).size;
  return { before, after };
}

async function main() {
  const roots = ROOTS.filter(r => fs.existsSync(r));
  if (roots.length === 0) {
    console.error('No target directories found:', ROOTS.join(', '));
    process.exit(1);
  }

  const files = roots.flatMap(walk).sort();
  if (files.length === 0) {
    console.log('No matching images found.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    try {
      const { before, after } = await compressFile(file);
      totalBefore += before;
      totalAfter += after;
      const pct = before > 0 ? (((before - after) / before) * 100).toFixed(1) : '0.0';
      console.log(`${file}: ${formatBytes(before)} -> ${formatBytes(after)} (-${pct}%)`);
    } catch (err) {
      console.error(`FAILED ${file}: ${err.message}`);
    }
  }

  const saved = totalBefore - totalAfter;
  const savedPct = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : '0.0';
  console.log('');
  console.log(`Files processed: ${files.length}`);
  console.log(`Total before:    ${formatBytes(totalBefore)}`);
  console.log(`Total after:     ${formatBytes(totalAfter)}`);
  console.log(`Total saved:     ${formatBytes(saved)} (-${savedPct}%)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
