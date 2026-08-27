import { NextResponse } from 'next/server';
import { readSession } from '@/lib/session';
import { sendLoginNotify } from '@/lib/email';

export async function POST(request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: true, note: 'no session' });
  const aadiEmail = process.env.AADI_EMAIL;
  const krithikaEmail = process.env.KRITHIKA_EMAIL;
  // The other person gets notified.
  const recipient = session.role === 'light' ? aadiEmail : krithikaEmail;
  if (!recipient) return NextResponse.json({ ok: true, note: 'no recipient set' });
  const result = await sendLoginNotify({
    to: recipient,
    whoLoggedIn: session.role
  });
  return NextResponse.json(result);
}
