import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname === '/admin/login';

  if (isAdmin && !isLogin && !req.auth) {
    const url = new URL('/admin/login', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
