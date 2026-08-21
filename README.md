# The Last Ever Apology, Truly

A private Next.js app for two readers. Deploy to Vercel, point wegrewtogether.in at it, hand the URL to the one person it's for.

## What's inside

- Cover, login, contents, seven chapters, all sections from the v2.2 prototype
- Real auth: dragon-picker + birthday password, sessions signed with HMAC-JWT, cookies HTTP-only
- Supabase backend (schema already run — see `tlea-schema.sql`)
- Ready for Resend email + Cloudinary image hosting (both wire up in Stage 3)

## Deploy — 6 steps, ~15 minutes

### 1. Push to GitHub

Easiest path if you don't want to use the command line:

1. Go to https://github.com/new
2. Repo name: `tlea` (private)
3. Do NOT initialize with a README
4. On the next page, click "uploading an existing file"
5. Drag every file and folder from this unzipped directory into the drop zone
6. Wait for upload (~1 minute), then click "Commit changes"

### 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Import the `tlea` repo (authorize GitHub if needed)
3. Framework Preset: Next.js (auto-detected)
4. Don't click Deploy yet — add environment variables first

### 3. Environment variables

In the Vercel import screen, expand "Environment Variables" and add each of these. Reference `.env.example` in the repo for the full list and format.

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://imagihnssgllampaqfbm.supabase.co` |
| `SUPABASE_SERVICE_KEY` | your service-role key (paste it from Supabase → Project Settings → API → service_role) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `xzdzf16n` |
| `RESEND_API_KEY` | your Resend key |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (for now — we'll swap to `you@wegrewtogether.in` after DNS) |
| `DARK_PASSWORD` | Krithika's birthday in `DDMMYYYY` or `DD/MM/YYYY` form — this is what YOU (dark Ammu) will type to log in |
| `LIGHT_PASSWORD` | Your birthday in same format — this is what KRITHIKA (light Ammu) will type |
| `AUTH_SECRET` | The 64-char random string in `.env.example` (or generate a fresh one via `openssl rand -hex 32`) |
| `NEXT_PUBLIC_APP_URL` | `https://tlea.vercel.app` for now (update after DNS to `https://wegrewtogether.in`) |
| `DARK_EMAIL` | `g.aadithiyas@gmail.com` |
| `LIGHT_EMAIL` | `awes9661@gmail.com` |

### 4. Deploy

Click Deploy. Wait ~2 minutes. Vercel gives you a URL like `https://tlea-abc123.vercel.app`.

### 5. Test on your iPhone

1. Open the URL on your phone
2. Tap the envelope, then the button
3. Pick the dark dragon → type Krithika's birthday → "Come in"
4. You should land on the contents home
5. Try every card. Report anything broken.

### 6. DNS — LAST step, only once everything else works

In Vercel: Project Settings → Domains → Add → `wegrewtogether.in`. Vercel shows you the DNS records to add. Go to GoDaddy → your domain → DNS → Manage → add the records Vercel gave you. Wait ~10 minutes for propagation.

## Local development (optional)

If you ever want to run the site on your Mac:

```bash
npm install
cp .env.example .env.local
# edit .env.local with real values
npm run dev
# open http://localhost:3000
```

## What's NOT wired yet (coming in Stage 3)

- Annotations don't save yet (Krithika's "Ammu says" boxes are read-only for now)
- Login-notification emails not sending yet
- Release timer buttons not wired
- Time capsule letters not implemented
- Chapter I painting still a placeholder — needs a real painted image of IMG_2278

Stage 3 adds all of the above.

## File map

- `src/app/page.js` — cover (envelope)
- `src/app/login/page.js` — the two-Ammus login
- `src/app/book/**` — every section
- `src/lib/content.js` — chapters, songs, dictionary, films, etc. Edit here to update content.
- `src/lib/supabase.js` — DB client (server-side only)
- `src/lib/session.js` — JWT cookie signing
- `src/middleware.js` — protects `/book/**` behind login
- `src/app/globals.css` — all styles
- `public/dragon-dark.webp`, `public/dragon-light.webp` — your dragon icons
