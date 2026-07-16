import { auth } from '@/lib/auth';

export type AdminRole = 'ADMIN' | 'EDITOR';

/** Exige apenas sessão válida (qualquer papel) — lança se não houver. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  return session;
}

/**
 * Exige sessão com um dos papéis informados, sem lançar — devolve `null`
 * quando o usuário está logado mas não tem o papel exigido, pra quem chama
 * poder devolver um erro amigável (ex.: `{ ok: false, error: '...' }`) em
 * vez de estourar uma exceção não tratada na Server Action.
 */
export async function requireRoleResult(...roles: AdminRole[]) {
  const session = await auth();
  const role = (session?.user as { role?: AdminRole } | undefined)?.role;
  if (!session?.user || !role || !roles.includes(role)) return null;
  return session;
}
