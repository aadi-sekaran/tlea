import { getSupabase } from './supabase';

export async function listWatchedItems(kind) {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('watched_items')
    .select('*')
    .eq('kind', kind)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('listWatchedItems error', error);
    return [];
  }
  return data || [];
}

export async function addWatchedItem({ kind, name, addedBy }) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const trimmed = name?.trim();
  if (!trimmed) return { error: 'name required' };
  const { data, error } = await sb
    .from('watched_items')
    .insert({ kind, name: trimmed, added_by: addedBy })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}
