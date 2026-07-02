import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/auth.config';

// Instância separada da de lib/auth.ts, de propósito: sem adapter/Prisma,
// pra rodar como Edge Function (ver nota em auth.config.ts).
const { auth } = NextAuth(authConfig);

/**
 * Protege todas as rotas /admin (exceto /admin/login).
 * Usuário não autenticado é redirecionado ao login.
 */
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
