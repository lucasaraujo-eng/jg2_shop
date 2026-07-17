import { auth } from '@/lib/auth';

export type AdminRole = 'ADMIN' | 'EDITOR';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  return session;
}

export async function requireRoleResult(...roles: AdminRole[]) {
  const session = await auth();
  const role = (session?.user as { role?: AdminRole } | undefined)?.role;
  if (!session?.user || !role || !roles.includes(role)) return null;
  return session;
}
