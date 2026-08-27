import { getSupabase } from './supabase';

// Default unlock: one year after the reveal date.
const UNLOCK_DATE = new Date('2027-09-19T00:00:00Z');

export async function getMyLetter(author, year = 2026) {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb
    .from('time_capsule_letters')
    .select('*')
    .eq('author', author)
    .eq('year', year)
    .maybeSingle();
  return data;
}

export async function saveMyLetter({ author, year = 2026, body, photoUrls = [] }) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const existing = await getMyLetter(author, year);
  if (existing?.sealed_at) {
    return { error: 'already sealed' };
  }
  const payload = {
    author,
    year,
    body,
    photo_urls: photoUrls,
    sealed_at: new Date().toISOString(),
    unlocks_at: UNLOCK_DATE.toISOString()
  };
  if (existing) {
    const { data, error } = await sb
      .from('time_capsule_letters')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) return { error: error.message };
    return { data };
  }
  const { data, error } = await sb
    .from('time_capsule_letters')
    .insert(payload)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export function isUnlocked(letter) {
  if (!letter) return false;
  const now = new Date();
  const unlocksAt = letter.unlocks_at ? new Date(letter.unlocks_at) : UNLOCK_DATE;
  return now >= unlocksAt;
}

// Admin backdoor — reads any letter regardless of unlock date. Called only from admin route.
export async function adminReadAll() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('time_capsule_letters')
    .select('*')
    .order('created_at', { ascending: true });
  return data || [];
}

export async function setAnnualTraditionChoice(choice) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const { data, error } = await sb
    .from('time_capsule_settings')
    .upsert({ id: 'default', annual_tradition: choice })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function getAnnualTraditionChoice() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb
    .from('time_capsule_settings')
    .select('*')
    .eq('id', 'default')
    .maybeSingle();
  return data?.annual_tradition ?? null;
}
