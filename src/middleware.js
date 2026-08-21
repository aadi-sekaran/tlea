import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/book')) {
    const cookie = request.cookies.get('tlea_session');
    const session = cookie ? await verifySession(cookie.value) : null;
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/book/:path*'] };
