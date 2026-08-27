import { getSupabase } from './supabase';

export async function listAnnotations(sectionKey) {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('annotations')
    .select('*')
    .eq('section_key', sectionKey)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('listAnnotations error', error);
    return [];
  }
  return data || [];
}

export async function createAnnotation({ sectionKey, itemKey, author, body }) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const { data, error } = await sb
    .from('annotations')
    .insert({
      section_key: sectionKey,
      item_key: itemKey || null,
      author,
      body
    })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function deleteAnnotation(id) {
  const sb = getSupabase();
  if (!sb) return { error: 'no db' };
  const { error } = await sb.from('annotations').delete().eq('id', id);
  if (error) return { error: error.message };
  return { ok: true };
}
