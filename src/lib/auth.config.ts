import type { NextAuthConfig } from 'next-auth';

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
