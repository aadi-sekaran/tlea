-- TLEA Stage 3 — Supabase schema additions
-- Run this in Supabase SQL editor. Idempotent (safe to re-run).

-- Annotations (from earlier stages, kept here for reference)
create table if not exists annotations (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  item_key text,
  author text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_annotations_section on annotations(section_key);

-- Time capsule letters
create table if not exists time_capsule_letters (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  year int not null default 2026,
  body text not null,
  photo_urls jsonb default '[]'::jsonb,
  sealed_at timestamptz,
  unlocks_at timestamptz not null default '2027-09-19T00:00:00Z',
  created_at timestamptz not null default now(),
  unique(author, year)
);

-- Time capsule settings (annual tradition on/off)
create table if not exists time_capsule_settings (
  id text primary key,
  annual_tradition boolean,
  updated_at timestamptz not null default now()
);

-- Release timer
create table if not exists release_timers (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  started_at timestamptz not null default now(),
  ends_at timestamptz not null,
  cancelled_at timestamptz,
  reminders_sent jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_release_active on release_timers(author) where cancelled_at is null;

-- Login events (audit)
create table if not exists login_events (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  ip text,
  created_at timestamptz not null default now()
);

-- Row Level Security: disable (this is a private single-tenant app, service role key handles all access)
-- If you want RLS on, add policies. For a two-person private site, service role is fine.
