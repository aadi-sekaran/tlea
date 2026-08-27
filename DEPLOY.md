# TLEA Stage 3 — Deployment Guide

## What this zip contains

Full rebuild of `src/`, plus `package.json`, `next.config.js`, `vercel.json`, `jsconfig.json`, `supabase-schema.sql`, `.env.example`.

Files NOT in this zip that you should keep:
- Everything in `/public/` (music, dragons, fonts, paintings, polaroids)
- `.git/`
- `node_modules/`
- `.env.local` (if you had one locally)

## Steps to deploy

### 1. Backup first

Before extracting, in GitHub Desktop → Show in Finder → copy `src/` to `src-v3-backup/` in case you need to compare.

### 2. Extract

Extract this zip into your repo root. Overwrite when prompted.

### 3. Verify /public untouched

Confirm these are still in `/public/`:
- `audio/bg-music.mp3`
- `dragons/pack-main.svg`, `pack-flying.svg`, `pack-story.svg`, `pack-stickers.svg`, `dragons-login.png`
- `fonts/SF-Pro.ttf` (or whatever names you used)
- `paintings/chapter-01-hero.jpg` (once you save Midjourney output)

### 4. Run Supabase migration

Open Supabase dashboard → SQL Editor → paste contents of `supabase-schema.sql` → Run. Safe to re-run if some tables already exist.

### 5. Add env vars in Vercel

Open Vercel dashboard → your project → Settings → Environment Variables.

Add every variable from `.env.example` with your real values. Redeploy after saving.

### 6. Install new dependencies

```
npm install
```

New dependencies added: `resend` (email).

### 7. Commit + push

```
git add .
git commit -m "stage 3: full mechanics + line and reply + dragon integration + polaroid lightbox + time capsule + release timer + emails + SF Pro"
git push
```

### 8. Verify after deploy (~90s)

- https://wegrewtogether.in → cover renders with envelope + wax seal
- /login → dragon picker shows dark + light heads
- Log in as dark → book contents loads with Netflix hero rotator
- /book/songs → 13 tracks visible, timestamps in badges, Spotify button
- /book/finalsong → Phir Bhi Tumko Chaahunga cinematic page
- /book/lineandreply → seed exchange visible
- /book/timecapsule → write-and-seal form
- /book/timecapsule/admin → shows both letters (empty for now)
- /book/release → 30-day countdown button
- /book/onthisday → today's card + calendar of all dates
- /book/firsts → Firsts tab shows ~60 entries, Lasts tab shows 7
- /book/ledger → Numbers band + 5 seed care-acts
- BG music toggle button top-right → tap plays

## What's still TODO

Content you need to fill:

1. **Ch II-VII prose** — in `src/lib/content.js`, `CHAPTERS[1..6].prose` arrays. Currently placeholders.
2. **Line and Reply exchanges** — in `content.js`, `LINE_AND_REPLY` array. Currently 4 seed items with placeholders for replies. Add 12-15 more real exchange pairs from WhatsApp.
3. **Ledger care-acts** — `content.js`, `LEDGER` array. Currently 5. Aim for 30-50 via the interview.
4. **Ch II-VI paintings** — save to `public/paintings/chapter-02-hero.jpg` through `chapter-06-hero.jpg`.
5. **Polaroids** — drop 15-18 JPGs into `public/polaroids/`. Optional captions in `public/polaroids/captions.json`:
   ```json
   { "01.jpg": "the snow day", "02.jpg": "Apache" }
   ```

Every one of these is additive. No code changes needed after each — just replace the content array or drop a file, commit, push.

## Things to verify carefully

- **Dragon-picker halves**: the login screen splits `dragons-login.png` into left (dark/Aadi) and right (light/Krithika) via CSS background-position. If your image proportions are different, adjust the `backgroundSize: '200% 100%'` value in `src/app/login/page.js`.
- **Song timestamps**: badges show at the timestamp declared in `content.js`. Verify tracks 11-12 show your heavy annotations as the whole note.
- **Track 13 lives on `/book/finalsong`**, not on the main Songs page.
- **Admin backdoor**: `/book/timecapsule/admin` only opens for dark dragon. Log in as light and try the URL — it should redirect to the normal capsule page.
- **BG music**: default OFF. First tap of the icon starts it. Choice persists in localStorage.
