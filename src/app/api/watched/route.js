import { NextResponse } from 'next/server';
import { readSession } from '@/lib/session';
import { listWatchedItems, addWatchedItem } from '@/lib/watched';

export async function GET(request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  if (kind !== 'film' && kind !== 'series') {
    return NextResponse.json({ error: 'kind must be film or series' }, { status: 400 });
  }
  const data = await listWatchedItems(kind);
  return NextResponse.json({ data });
}

export async function POST(request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  const { kind, name } = await request.json();
  if (kind !== 'film' && kind !== 'series') {
    return NextResponse.json({ error: 'kind must be film or series' }, { status: 400 });
  }
  const result = await addWatchedItem({ kind, name, addedBy: session.role });
  return NextResponse.json(result);
}
