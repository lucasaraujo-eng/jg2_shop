'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div className="mx-auto flex max-w-[400px] flex-col gap-4">
      <h1 className="font-display text-2xl font-black text-ink">Login administrativo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        {error && <p className="text-sm font-semibold text-brand">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
