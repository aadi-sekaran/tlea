#!/usr/bin/env node
// Fetches TMDB poster + overview for every title in FILMS/SERIES (content.js)
// at build time and caches the result to src/lib/posters.generated.json, so
// the site never calls TMDB at runtime. Re-run manually whenever the
// watched list changes: node scripts/fetch-posters.js

const fs = require('fs');
const path = require('path');

// .env.local isn't auto-loaded outside `next dev`/`next build` - parse it manually.
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('Missing TMDB_READ_ACCESS_TOKEN (set it in .env.local or the environment).');
  process.exit(1);
}

const DELAY_MS = 120;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Manually verified overrides for titles TMDB's default search picks wrong
// or can't find under the list's spelling (checked by hand against the raw
// candidate list, not guessed): {kind, query} to actually search with,
// keyed by the title as it appears in FILMS/SERIES. `kind` overrides the
// default movie/tv lookup where a "film" is actually indexed as a TV show.
const OVERRIDES = {
  'Tamizh Padam': { kind: 'film', query: 'Thamizh Padam' },
  'Velaiilla Pattadhari': { kind: 'film', query: 'Velaiyilla Pattathari' },
  'With Love': { kind: 'film', query: 'With Love', year: 2026 }, // the 2026 Tamil film, not the 2021 US series or the Bond films
  'Panchathanthiram': { kind: 'film', query: 'Panchatanthiram', year: 2002 } // TMDB spells the 2002 Kamal Haasan film with one fewer "h"
};

function normalize(str) {
  return str.toLowerCase().replace(/[:\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Indian-language original titles dominate this list; when several
// results share the exact normalized title, prefer that language, then
// highest popularity, to avoid picking an unrelated Western film/show
// that happens to share the name.
const PREFERRED_LANGS = ['ta', 'ml', 'te', 'hi', 'kn'];

async function tmdbSearch(kind, title, year) {
  const endpoint = kind === 'film' ? 'movie' : 'tv';
  const yearParam = year ? `&${kind === 'film' ? 'year' : 'first_air_date_year'}=${year}` : '';
  const url = `https://api.themoviedb.org/3/search/${endpoint}?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1${yearParam}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`TMDB ${res.status} for "${title}": ${await res.text()}`);
  }
  const data = await res.json();
  const results = data.results || [];
  if (results.length === 0) return null;

  const target = normalize(title);
  const exact = results.filter(r => normalize(r.title || r.name || '') === target);

  if (exact.length === 1) return exact[0];
  if (exact.length > 1) {
    const preferred = exact.filter(r => PREFERRED_LANGS.includes(r.original_language));
    const pool = preferred.length > 0 ? preferred : exact;
    return pool.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0];
  }
  // No exact normalized match at all: fall back to TMDB's own top result.
  return results[0];
}

async function fetchFor(kind, titles) {
  const out = {};
  let matched = 0;
  for (const title of titles) {
    if (Object.prototype.hasOwnProperty.call(OVERRIDES, title) && OVERRIDES[title] === null) {
      out[title] = { posterPath: null, matchedTitle: null, year: null, overview: null };
      console.log(`[${kind}] "${title}" -> SKIPPED (no reliable TMDB match found)`);
      continue;
    }
    const override = OVERRIDES[title];
    const searchKind = override ? override.kind : kind;
    const searchQuery = override ? override.query : title;
    const searchYear = override ? override.year : undefined;
    try {
      const result = await tmdbSearch(searchKind, searchQuery, searchYear);
      if (result) {
        const matchedTitle = result.title || result.name;
        const year = (result.release_date || result.first_air_date || '').slice(0, 4);
        out[title] = {
          posterPath: result.poster_path || null,
          matchedTitle,
          year: year || null,
          overview: result.overview || null
        };
        matched++;
        const flag = matchedTitle.toLowerCase() !== title.toLowerCase() ? '  <-- CHECK MATCH' : '';
        console.log(`[${kind}] "${title}" -> "${matchedTitle}" (${year || 'no year'})${result.poster_path ? '' : ' [no poster]'}${flag}`);
      } else {
        out[title] = { posterPath: null, matchedTitle: null, year: null, overview: null };
        console.log(`[${kind}] "${title}" -> NO MATCH`);
      }
    } catch (err) {
      out[title] = { posterPath: null, matchedTitle: null, year: null, overview: null };
      console.error(`[${kind}] "${title}" -> ERROR: ${err.message}`);
    }
    await sleep(DELAY_MS);
  }
  return { out, matched };
}

async function main() {
  const { FILMS, SERIES } = await import(path.join(process.cwd(), 'src/lib/content.js'));
  const filmTitles = FILMS.map(f => f.name);
  const seriesTitles = SERIES.map(s => s.name);

  console.log(`Fetching posters for ${filmTitles.length} films...`);
  const films = await fetchFor('film', filmTitles);

  console.log(`\nFetching posters for ${seriesTitles.length} series...`);
  const series = await fetchFor('series', seriesTitles);

  const outPath = path.join(process.cwd(), 'src/lib/posters.generated.json');
  fs.writeFileSync(outPath, JSON.stringify({ films: films.out, series: series.out }, null, 2));

  console.log(`\nFilms matched: ${films.matched}/${filmTitles.length}`);
  console.log(`Series matched: ${series.matched}/${seriesTitles.length}`);
  console.log(`Written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
