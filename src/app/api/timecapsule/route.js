import { NextResponse } from 'next/server';
import { readSession } from '@/lib/session';
import { saveMyLetter } from '@/lib/timecapsule';

export async function POST(request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  const { body, photoUrls } = await request.json();
  if (!body?.trim()) return NextResponse.json({ error: 'body required' }, { status: 400 });
  const result = await saveMyLetter({
    author: session.role,
    body,
    photoUrls
  });
  return NextResponse.json(result);
}
