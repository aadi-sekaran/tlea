import { NextResponse } from 'next/server';
import { readSession } from '@/lib/session';
import { listAnnotations, createAnnotation } from '@/lib/annotations';

export async function GET(request) {
  const url = new URL(request.url);
  const sectionKey = url.searchParams.get('section');
  if (!sectionKey) return NextResponse.json({ error: 'section required' }, { status: 400 });
  const data = await listAnnotations(sectionKey);
  return NextResponse.json({ data });
}

export async function POST(request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  const body = await request.json();
  const { sectionKey, itemKey, body: text } = body;
  if (!sectionKey || !text) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  const result = await createAnnotation({
    sectionKey,
    itemKey,
    author: session.role,
    body: text
  });
  return NextResponse.json(result);
}
