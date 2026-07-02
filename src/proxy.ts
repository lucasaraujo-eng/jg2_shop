import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

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
