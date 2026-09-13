# TLEA v4 — Build Brief for Claude Code + Upload Plan

## For Aadi: What you do vs what Claude Code does

### YOU (uploads, ~20 min)

All heavy assets go into the repo via **GitHub Desktop → drag folder into repo → Commit → Push**. That triggers a Vercel auto-deploy. Static files under `public/` are served directly, no config needed.

**Where each thing goes:**

1. **Chapter photos:** `public/photos/tlea-photo/ch-01/` through `ch-07/`
   - Each folder: `Hero.jpg` (the poster shot, static) + `n1.jpg`, `n2.jpg`, `n3.jpg`... (the rotating carousel)
   - All portrait aspect (2:3). Ignore any 3:2 landscape versions.
   - You've already done this — confirm they're all pushed.

2. **Polaroids:** `public/polaroids/`
   - `01.jpg`, `02.jpg`, ... `18.jpg` — edge-to-edge photos, the white polaroid border is already baked into the JPG.
   - Optional: `captions.json` mapping filename → caption
   - You said these are already uploaded — confirm.

3. **Dragon batch 2 (18 files):** unzip `v4-package.zip` from this delivery, drop the `public/dragons/scenes/` folder from it into your repo's `public/dragons/`. That's it.

4. **Dragon batch 2 missing (28 files):** generate in ChatGPT using `MISSING_DRAGONS.md` (also in the zip). Save each with the exact filename listed. Drop into the same `public/dragons/scenes/` folder as you generate them. **Do these in parallel over the next 2 days** — the site will render fine with placeholders for missing ones.

5. **New content:** copy `content.ts` from the zip into a new file next to your existing content, or replace your existing `src/lib/content.js`. Claude Code will adapt shape either way (see prompt below).

### CLAUDE CODE (the build, ~2-3 hours guided)

Give it the prompt below. It reads your repo, adapts my content to the existing shape, wires the new farewell page, fixes the polaroid frame, sets up chapter photo rotation, and integrates the dragon assets. One branch, one push, done.

---

## The Claude Code prompt (copy this into Claude Code exactly)

```
You are working on the TLEA repo (Next.js 14 App Router) in this folder.
This is a production app deployed to Vercel with real auth, Supabase,
Resend, cron jobs, and an admin backdoor at /book/timecapsule/admin.
DO NOT TOUCH: middleware.js, session.js, supabase.js, Resend integration,
cron routes, or the admin backdoor route. Only touch content, UI, and
asset wiring.

Before making any changes, READ these files and report what you find:
1. src/lib/content.js — full contents. Report the exact shape of
   CHAPTERS, LINE_AND_REPLY (or whatever it's called), LEDGER, SONGS.
2. src/app/book/page.js — the browse home. Report the reading order.
3. src/app/book/chapter/[num]/page.js (or however chapters are routed)
4. src/app/book/polaroids/page.js — find the CSS for .polaroid
5. src/app/book/lineandreply/page.js or line-and-reply
6. src/app/globals.css — find polaroid styles and any dragon references
7. ls public/dragons/ and public/dragons/scenes/ — report existing files
8. ls public/photos/tlea-photo/ — report chapter folders and their contents

Then execute these six tasks in ONE branch called v4:

═══ TASK 1: MERGE VERBATIM CONTENT ═══

I've handed you /tmp/v4-package/content.ts (or wherever the file lives).
It contains the exact locked prose Aadi wrote. Merge it into
src/lib/content.js, adapting to the existing shape.

Specifically:
- CHAPTERS[0].prose (or .paragraphs — use whichever key already exists)
  = the paragraphs array from content.ts chapters[0]. This is Chapter I:
  the locked Tanglish opening (9 paragraphs, Feb 2023 through first
  coffee) followed by new prose (18 paragraphs, June 3 through the
  first kiss Sept 18). Total 27 paragraphs.
- CHAPTERS[1] = Chapter II, 21 paragraphs, complete: true.
- CHAPTERS[2] = Chapter III, 5 paragraphs (half chapter), keep any
  existing "to be continued" placard rendering.
- CHAPTERS[3-5] = leave empty prose, keep placards. Aadi will write.
- CHAPTERS[6] = Chapter VII apology — verify against content.ts, should
  already match. If not, use content.ts version.
- Foreword and songs — verify no accidental drift from content.ts.
  Songs annotations 1-12 must be VERBATIM the strings in content.ts.

Do not paraphrase. Do not edit grammar. If content.ts has typos, keep
them — they are intentional (Aadi's voice).

═══ TASK 2: LINE AND REPLY — 16 PAIRS ═══

Replace the current LINE_AND_REPLY seed data (currently 4 items per
DEPLOY.md) with the 16-pair linePairs array from content.ts. The shape
of each pair in content.ts is:
  { id, speaker, line, reply_from, reply, date_hint }
Adapt to whatever field names your current code expects, but preserve
every text string EXACTLY.

═══ TASK 3: NEW /book/farewell PAGE ═══

Create src/app/book/farewell/page.js. It's a new section that goes
BETWEEN Chapter VII (apology) and the Final Song page in the reading
order.

Content comes from content.ts `farewell` export:
  - farewell.title: "So, this is more like a farewell letter to you."
  - farewell.eyebrow: "A farewell letter"
  - farewell.paragraphs: array of 16 paragraphs

Style: match the apology page (Chapter VII) but softer — deep rose
gradient background instead of navy, Fraunces italic title, drop cap
on first paragraph. If you have a small dragon divider (public/dragons/
scenes/farewell-hero.png if it exists, otherwise farewell-outro.png,
otherwise the existing finalsong-cliff.png), use it at the bottom of
the page as a signoff mark.

Also:
- Add navigation: previous link to /book/chapter/7, next link to
  /book/finalsong.
- Add a card on the browse home (src/app/book/page.js) positioned
  between the featured Chapter VII apology card and the final song
  entry. Rose gradient, "Chapter VII+1 · A farewell letter" eyebrow.
- Add to middleware protected routes if middleware whitelists
  specific paths.

═══ TASK 4: FIX DOUBLE POLAROID FRAME ═══

The polaroid images uploaded to public/polaroids/ have the white
polaroid border already photographed in as part of the JPG. The
current CSS is adding another CSS frame (background, padding, shadow),
creating a double-frame look.

Fix:
- In whatever file styles .polaroid (src/app/globals.css or a scoped
  CSS module), remove background, padding, and border-radius on the
  wrapper.
- Keep ONLY filter: drop-shadow(0 8px 16px rgba(46, 59, 84, 0.18))
  for lift.
- Image inside: display: block, width: 100%, height: auto.
- Caption sits below with normal spacing, no absolute positioning.

═══ TASK 5: CHAPTER PHOTO CAROUSEL ═══

Currently the chapter page probably shows a single painting placeholder.
Replace with a rotating carousel that reads from
`public/photos/tlea-photo/ch-XX/`.

Behavior:
- Hero.jpg is the poster shot — renders at the top of the chapter page
  as a static hero image (not in the rotation).
- n1.jpg, n2.jpg, n3.jpg... = auto-rotating carousel BELOW Hero.
- Crossfade at 6-second intervals, 1.2s fade duration.
- Ken Burns effect on each: scale 1.0 → 1.05 over the 6 seconds,
  subtle random-direction pan of 2-3%.
- Read the folder at build time (Next.js getStaticProps or server
  component) with fs. Filter to files matching /^n\d+\.jpg$/i.
  Sort by number.
- If a chapter folder is empty or missing, hide the carousel and just
  show Hero.jpg if present, otherwise fall back to a small dragon
  illustration (chapter-XX-mark.png from public/dragons/scenes/).
- Respect prefers-reduced-motion: show one still, no animation.

Chapter 7 (apology) has no photos and no folder — use scene-sunset
from public/dragons/ pack (or chapter-07-mark.png if you have it) as
the hero.

═══ TASK 6: WIRE DRAGON ASSETS ═══

18 new dragon assets are in public/dragons/scenes/ (already dropped by
Aadi). Wire them by filename to these placements:

- Cover envelope (src/app/page.js): keep the existing main_074.png,
  no change unless cover-envelope.png now exists in scenes/ (if so,
  swap to it).
- Tile icons on browse home: use tile-icon-*.png files as decorative
  images on each section card (small, top-left of tile). If a specific
  tile-icon file doesn't exist yet, fall back to a text glyph — the
  page must not break on missing images.
- Chapter marks: chapter-XX-mark.png as a divider element between the
  chapter synopsis and the prose. Small, centered, ~200px wide.
- Time capsule sealed state: timecapsule-sealed.png as the hero
  illustration on /book/timecapsule when the capsule is locked.
- Release page: release-flying.png as the hero on /book/release.
- Final song page: finalsong-cliff.png as the hero background on
  /book/finalsong (with a warm overlay so text stays readable).
- On this day header: ontd-header.png at top of /book/onthisday.
- Watched header: watched-header.png at top of /book/watched.
- Dictionary header: dictionary-header.png at top of /book/dictionary.
- Trips header: trips-header.png at top of /book/trips.
- Error / empty states: error-oops.png where currently shown as text.
- Loading states: loading-flying.png in place of any spinner.

RULE: every dragon reference must gracefully fall back to nothing (or
a small text glyph) if the file doesn't exist. Aadi is generating 28
more assets in parallel with ChatGPT — they'll trickle in over the
next 48 hours. The site must render fine with any subset.

═══ CONSTRAINTS FOR ALL TASKS ═══

- Read files first, then modify. Report the current shape before
  guessing.
- Every locked text string from content.ts is VERBATIM. No paraphrasing,
  no grammar fixes.
- Don't touch middleware, session, auth, Supabase queries, Resend,
  cron, admin backdoor.
- Palette variables (--ivory, --cream, --blush, --rose, --wine,
  --powder, --lavender, --peach, --butter, --sage, --navy, --brown)
  stay unchanged. If they don't exist yet, add them.
- No em-dashes or en-dashes anywhere in new content. Only commas,
  periods, colons.
- Run `npm run build` before committing. Build must pass. If it fails,
  report the exact error and stop.
- Commit message: "v4: farewell letter, Ch I-III prose, 16 line pairs,
  chapter photo carousel, polaroid frame fix, dragon batch 2 wiring"

═══ AFTER PUSHING ═══

Push to main. Vercel will auto-deploy in ~90 seconds. Report the
deploy URL. Then:

1. Visit /book/farewell — verify text renders, drop cap on first
   paragraph, navigation works.
2. Visit /book/chapter/1 — verify all 27 paragraphs, no duplicates,
   Ch I opening is Tanglish then transitions to new prose without a
   header break.
3. Visit /book/chapter/2 — verify 21 paragraphs.
4. Visit /book/chapter/3 — verify 5 paragraphs + "to be continued"
   placard visible.
5. Visit /book/polaroids — verify no double frame, photos edge-to-edge.
6. Visit /book/line-and-reply — verify 16 pairs, order preserved.
7. Visit /book/onthisday, /book/watched, /book/dictionary, /book/trips
   — verify new headers show.
8. Visit /book/release, /book/finalsong, /book/timecapsule — verify
   new hero images show.

Report anything that broke.
```

---

## After Claude Code finishes

The v4 site is live. You should:

1. Preview end-to-end on your phone as the dark dragon.
2. Test as the light dragon (Krithika's login) — verify admin backdoor
   silently redirects light.
3. Start generating the 28 missing dragons in ChatGPT. Push each
   as you get them — the site absorbs them automatically.
4. Write Chapter III second half + Chapters IV, V, VI when you can
   (fresh Claude chat per chapter, paste handoff brief + bullets).
5. Track 13 note morning of the reveal.
6. Print envelope + wax seal + QR code for Iceland.

---

## What's in the v4-package.zip

- `content.ts` — all locked content (foreword, chapters I-III + VII,
  farewell letter, 16 line pairs). This is what Claude Code merges
  into your existing `src/lib/content.js`.
- `MISSING_DRAGONS.md` — the 28 dragon prompts for ChatGPT.
- `public/dragons/scenes/` — 18 ready-to-use dragon PNGs. Drop into
  your repo's `public/dragons/scenes/` folder as-is.

Total zip: ~600KB. Small. You can unzip, drag the folders into your
repo via Finder, commit and push before you even start on Claude Code.

---

## Final honest read

- Your site is deployed and functional at v0.3.0.
- v4 adds: farewell letter (new), Ch I-III prose (yours), 16 real
  line pairs (yours), fixed polaroid frame, chapter photo carousel,
  dragon assets wired in.
- Claude Code executes this in one session.
- You do uploads (photos, polaroids, dragons) via GitHub Desktop.
- You generate remaining dragons in ChatGPT over the next 48 hours.
- Sept 19 reveal: on schedule.

The only content still missing after v4 lands is Chapters III (second
half), IV, V, VI, Track 13 note, and 28 dragon assets — all of which
can be added incrementally without another rebuild. The framework is
done. You're just filling it in.
