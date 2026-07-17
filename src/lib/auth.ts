import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/lib/auth.config';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, request) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        const ip = clientIp(request.headers);
        if (!checkRateLimit(`login:ip:${ip}`, LOGIN_LIMIT * 3, LOGIN_WINDOW_MS)) return null;
        if (!checkRateLimit(`login:${ip}:${email.toLowerCase()}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)) return null;

        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
});
