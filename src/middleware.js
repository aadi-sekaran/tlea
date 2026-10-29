import { NextResponse } from 'next/server';
import { readSessionFromRequest } from '@/lib/session';

const PUBLIC_PATHS = ['/', '/login', '/api/login'];

// Temporary full-site takedown, toggled by an env var so it needs no code
// change to reverse. Leaves /api/* (cron, login-notify, etc.) working.
const SITE_TAKEDOWN = process.env.SITE_TAKEDOWN === 'true';
const TAKEDOWN_HTML = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found</title></head>
<body style="margin:0;height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafafa;color:#555">
<p>This page has been deleted.</p>
</body></html>`;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (SITE_TAKEDOWN && !pathname.startsWith('/api/')) {
    return new Response(TAKEDOWN_HTML, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  // Prank paywall: active until PAYWALL_UNTIL (ISO time), then switches itself
  // off. The paywall page sets tlea_paid once she gets past it.
  const paywallUntil = Date.parse(process.env.PAYWALL_UNTIL || '');
  if (
    paywallUntil > Date.now() &&
    !request.cookies.get('tlea_paid') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/paywall') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/fonts') &&
    !['/icon.png', '/apple-icon.png', '/manifest.webmanifest'].includes(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/paywall';
    return NextResponse.rewrite(url);
  }

  if (
    pathname.startsWith('/paywall') ||
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/dragons') ||
    pathname.startsWith('/audio') ||
    pathname.startsWith('/paintings') ||
    pathname.startsWith('/polaroids') ||
    pathname.startsWith('/opening') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api/cron')
  ) {
    return NextResponse.next();
  }

  const session = await readSessionFromRequest(request);
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
