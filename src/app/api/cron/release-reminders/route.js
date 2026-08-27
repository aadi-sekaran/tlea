import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendReleaseReminder } from '@/lib/email';

export async function GET(request) {
  // Vercel cron sends an authorization header. Verify it matches CRON_SECRET.
  const authHeader = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: 'no db' }, { status: 500 });

  const { data: timers } = await sb
    .from('release_timers')
    .select('*')
    .is('cancelled_at', null);

  if (!timers) return NextResponse.json({ ok: true, processed: 0 });

  const now = new Date();
  const results = [];

  for (const timer of timers) {
    const endsAt = new Date(timer.ends_at);
    const startedAt = new Date(timer.started_at);
    const daysPassed = Math.floor((now - startedAt) / (24 * 60 * 60 * 1000));
    const daysLeft = Math.max(0, Math.ceil((endsAt - now) / (24 * 60 * 60 * 1000)));
    const reminders = timer.reminders_sent || [];

    // Day 20 reminder (10 days left) if not sent
    if (daysPassed >= 20 && !reminders.includes('day20')) {
      const recipient = timer.author === 'dark'
        ? process.env.AADI_EMAIL
        : process.env.KRITHIKA_EMAIL;
      if (recipient) {
        await sendReleaseReminder({ to: recipient, daysLeft });
        await sb
          .from('release_timers')
          .update({ reminders_sent: [...reminders, 'day20'] })
          .eq('id', timer.id);
        results.push({ id: timer.id, sent: 'day20' });
      }
    }
    // Day 27 reminder (3 days left) if not sent
    else if (daysPassed >= 27 && !reminders.includes('day27')) {
      const recipient = timer.author === 'dark'
        ? process.env.AADI_EMAIL
        : process.env.KRITHIKA_EMAIL;
      if (recipient) {
        await sendReleaseReminder({ to: recipient, daysLeft });
        await sb
          .from('release_timers')
          .update({ reminders_sent: [...reminders, 'day27'] })
          .eq('id', timer.id);
        results.push({ id: timer.id, sent: 'day27' });
      }
    }
  }

  return NextResponse.json({ ok: true, processed: results.length, details: results });
}
