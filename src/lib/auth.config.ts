import type { NextAuthConfig } from 'next-auth';

/**
 * Config base do Auth.js, sem adapter/providers — usada pelo proxy.ts
 * (protege /admin) e pela config completa em auth.ts. Mantida separada de
 * propósito: o proxy roda como Edge Function no Netlify, e o Prisma Client
 * não compila nesse runtime. Só o essencial pra ler o JWT da sessão fica
 * aqui; adapter (Prisma) e o provider Credentials (bcrypt) ficam só em
 * auth.ts, que roda nas rotas de API (Node.js runtime).
 */
export const authConfig: NextAuthConfig = {
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as typeof session.user & { role?: string }).role = token.role as string | undefined;
      return session;
    },
  },
};
