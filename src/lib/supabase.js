import { createClient } from '@supabase/supabase-js';

// Server-side client using service role — bypasses RLS.
// NEVER import this in a Client Component. Only in API routes / server components.
// Lazy-initialized so builds work even without env vars set.
let client = null;

export function getSupabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) {
      throw new Error('Supabase env vars missing');
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

// Backwards-compat proxy: existing `supabase.from(...)` calls still work
export const supabase = new Proxy({}, {
  get(_, prop) {
    const c = getSupabase();
    const val = c[prop];
    return typeof val === 'function' ? val.bind(c) : val;
  }
});
