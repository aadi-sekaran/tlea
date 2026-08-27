import { NextResponse } from 'next/server';
import { readSession } from '@/lib/session';
import { startRelease, cancelRelease } from '@/lib/release-timer';

export async function POST(request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  const { action } = await request.json();
  if (action === 'start') {
    const result = await startRelease(session.role);
    return NextResponse.json(result);
  }
  if (action === 'cancel') {
    const result = await cancelRelease(session.role);
    return NextResponse.json(result);
  }
  return NextResponse.json({ error: 'unknown action' }, { status: 400 });
}
