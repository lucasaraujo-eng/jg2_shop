'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError('E-mail ou senha inválidos.');
      return;
    }
    router.push('/admin/produtos');
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(181,32,43,.14)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(181,32,43,.1)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-[400px]">
        <div className="flex flex-col items-center text-center">
          <Image src="/assets/jg2-logo.png" alt="JG2 Produtos de Segurança" width={800} height={400} className="h-11 w-auto" />
          <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-brand">Painel administrativo</p>
          <h1 className="mt-1.5 font-display text-2xl font-black text-ink">Entrar na sua conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-7 shadow-[0_18px_44px_rgba(20,18,16,.08)]">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">E-mail</span>
            <input
              required
              type="email"
              autoComplete="username"
              placeholder="voce@jg2.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Senha</span>
            <input
              required
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && (
            <p className="rounded-lg bg-surface-badge px-3.5 py-2.5 text-sm font-semibold text-brand">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1.5 rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-tertiary">Acesso restrito à equipe JG2®.</p>
      </div>
    </div>
  );
}
