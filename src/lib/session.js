import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE = 'tlea_session';
const SECRET_STR = process.env.SESSION_SECRET || 'dev-secret-change-me-in-production';
const secret = new TextEncoder().encode(SECRET_STR);

export async function createSession(role) {
  const token = await new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(secret);
  const jar = cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  });
}

export async function readSession() {
  try {
    const jar = cookies();
    const raw = jar.get(COOKIE)?.value;
    if (!raw) return null;
    const { payload } = await jwtVerify(raw, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function readSessionFromRequest(request) {
  try {
    const raw = request.cookies.get(COOKIE)?.value;
    if (!raw) return null;
    const { payload } = await jwtVerify(raw, secret);
    return payload;
  } catch {
    return null;
  }
}

export function clearSession() {
  const jar = cookies();
  jar.delete(COOKIE);
}

export function isAadi(session) {
  return session?.role === 'dark';
}

export function isKrithika(session) {
  return session?.role === 'light';
}
