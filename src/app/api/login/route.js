import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(request) {
  const { role, password } = await request.json();
  if (!role || !password) {
    return NextResponse.json({ error: 'missing' }, { status: 400 });
  }
  const darkPw = process.env.DARK_PASSWORD;
  const lightPw = process.env.LIGHT_PASSWORD;
  const expected = role === 'dark' ? darkPw : role === 'light' ? lightPw : null;
  if (!expected || password.trim().toLowerCase() !== expected.trim().toLowerCase()) {
    return NextResponse.json({ error: 'wrong' }, { status: 401 });
  }
  await createSession(role);
  return NextResponse.json({ ok: true, role });
}
