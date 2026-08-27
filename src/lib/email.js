import { Resend } from 'resend';

function allowlist() {
  const raw = process.env.EMAIL_ENABLED_FOR || '';
  return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
}

function isAllowed(to) {
  const list = allowlist();
  if (!list.length) return false; // safe default: no allowlist = block all
  return list.includes(to.toLowerCase());
}

const FROM = process.env.EMAIL_FROM || 'notify@wegrewtogether.in';

export async function sendLoginNotify({ to, whoLoggedIn }) {
  if (!isAllowed(to)) {
    console.log(`[email] skipping login notify to ${to} (not in allowlist)`);
    return { skipped: true };
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[email] RESEND_API_KEY missing');
    return { error: 'no key' };
  }
  const resend = new Resend(key);
  const subject = whoLoggedIn === 'light' ? 'She opened it.' : 'You opened it.';
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#35445C;max-width:480px;margin:2rem auto;padding:2rem;background:#FFF8EE;border-radius:12px">
      <p style="font-family:Georgia,serif;font-style:italic;color:#8A6F61;font-size:1.4rem;margin-bottom:1rem">
        ${whoLoggedIn === 'light' ? 'Krithika just logged in.' : 'You logged in.'}
      </p>
      <p style="color:#35445C;line-height:1.6">
        ${new Date().toISOString()}
      </p>
    </div>
  `;
  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html
    });
    return { ok: true, result };
  } catch (e) {
    console.error('[email] send failed', e);
    return { error: e.message };
  }
}

export async function sendReleaseReminder({ to, daysLeft }) {
  if (!isAllowed(to)) return { skipped: true };
  const key = process.env.RESEND_API_KEY;
  if (!key) return { error: 'no key' };
  const resend = new Resend(key);
  const subject = `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#35445C;max-width:480px;margin:2rem auto;padding:2rem;background:#FFF8EE;border-radius:12px">
      <p style="font-family:Georgia,serif;font-style:italic;color:#8A6F61;font-size:1.4rem;margin-bottom:1rem">
        ${daysLeft} days until the site takes itself down.
      </p>
      <p style="color:#35445C;line-height:1.6">
        You can cancel at any time from the Release page.
      </p>
      <p style="margin-top:1.5rem">
        <a href="https://wegrewtogether.in/book/release" style="color:#DFA6AE">Open the site</a>
      </p>
    </div>
  `;
  try {
    const result = await resend.emails.send({ from: FROM, to, subject, html });
    return { ok: true, result };
  } catch (e) {
    return { error: e.message };
  }
}

export async function sendCapsuleUnlocked({ to }) {
  if (!isAllowed(to)) return { skipped: true };
  const key = process.env.RESEND_API_KEY;
  if (!key) return { error: 'no key' };
  const resend = new Resend(key);
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#35445C;max-width:480px;margin:2rem auto;padding:2rem;background:#FFF8EE;border-radius:12px">
      <p style="font-family:Georgia,serif;font-style:italic;color:#8A6F61;font-size:1.4rem">
        The capsule is open.
      </p>
      <p style="margin-top:1.5rem">
        <a href="https://wegrewtogether.in/book/timecapsule" style="color:#DFA6AE">Read the letters</a>
      </p>
    </div>
  `;
  const resend2 = new Resend(key);
  try {
    const result = await resend2.emails.send({ from: FROM, to, subject: 'The capsule is open.', html });
    return { ok: true, result };
  } catch (e) {
    return { error: e.message };
  }
}
