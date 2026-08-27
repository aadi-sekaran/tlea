import { getSupabase } from './supabase';

export async function getReleaseStatus(author) {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb
    .from('release_timers')
    .select('*')
    .eq('author', author)
    .eq('cancelled_at', null)
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function startRelease(author) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const now = new Date();
  const endsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const { data, error } = await sb
    .from('release_timers')
    .insert({
      author,
      started_at: now.toISOString(),
      ends_at: endsAt.toISOString(),
      reminders_sent: []
    })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function cancelRelease(author) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const status = await getReleaseStatus(author);
  if (!status) return { error: 'no active timer' };
  const { data, error } = await sb
    .from('release_timers')
    .update({ cancelled_at: new Date().toISOString() })
    .eq('id', status.id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export function daysRemaining(timer) {
  if (!timer) return null;
  const endsAt = new Date(timer.ends_at);
  const now = new Date();
  const diffMs = endsAt - now;
  return Math.max(0, Math.ceil(diffMs / (24 * 60 * 60 * 1000)));
}
