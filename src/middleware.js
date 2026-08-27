import { NextResponse } from 'next/server';
import { readSessionFromRequest } from '@/lib/session';

const PUBLIC_PATHS = ['/', '/login', '/api/login'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/dragons') ||
    pathname.startsWith('/audio') ||
    pathname.startsWith('/paintings') ||
    pathname.startsWith('/polaroids') ||
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
