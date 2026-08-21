import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createSession, normalizeDigits } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }

  const { dragon, password } = body || {};
  if (dragon !== 'dark' && dragon !== 'light') {
    return NextResponse.json({ error: 'bad_dragon' }, { status: 400 });
  }

  const supplied = normalizeDigits(password);
  const expected = dragon === 'dark'
    ? normalizeDigits(process.env.DARK_PASSWORD)
    : normalizeDigits(process.env.LIGHT_PASSWORD);

  if (!expected || supplied !== expected) {
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 });
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, ammu_type, email, real_name')
    .eq('ammu_type', dragon)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: 'no_profile' }, { status: 500 });
  }

  const token = await createSession({
    userId: profile.id,
    ammuType: profile.ammu_type,
    email: profile.email,
    name: profile.real_name,
  });

  // Log this login (fire and forget; don't await)
  supabase.from('login_events').insert({ user_id: profile.id }).then(() => {});

  const response = NextResponse.json({ ok: true, ammuType: dragon });
  response.cookies.set('tlea_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return response;
}
