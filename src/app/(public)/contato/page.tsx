'use client';

import { useState } from 'react';
import { useCart } from '@/stores/cart';
import { submitQuote } from '@/server/actions/quote';

/**
 * Stub (Bloco 1): formulário simples só para validar o fluxo
 * submitQuote → Prisma → e-mail fim a fim. O layout completo (drawer de
 * 2 etapas + página /orcamento do protótipo) entra no Bloco 5.
 */
export default function ContatoPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [form, setForm] = useState({ name: '', email: '', phone: '', cnpj: '', purpose: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const result = await submitQuote({
      ...form,
      items: items.map((i) => ({
        code: i.code,
        name: i.name,
        quantity: i.quantity,
        variantLabel: i.variantLabel,
        productId: i.productId,
      })),
    });
    if (result.ok) {
      setStatus('sent');
      clear();
    } else {
      setStatus('error');
      setError(result.error);
    }
  }

  if (status === 'sent') {
    return (
      <div className="mx-auto max-w-[600px] px-7 py-24 text-center">
        <p className="text-3xl">✓</p>
        <h1 className="mt-4 font-display text-2xl font-black text-ink">Orçamento enviado!</h1>
        <p className="mt-2 text-muted">Nossa equipe retorna com valores e prazos em até 1 dia útil.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] px-7 py-12">
      <h1 className="font-display text-3xl font-black text-ink">Solicitação de orçamento</h1>
      <p className="mt-2 text-muted">
        {items.length > 0 ? `${items.length} item(ns) no seu orçamento.` : 'Seu orçamento está vazio — você ainda pode enviar uma mensagem.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          required
          placeholder="Nome*"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          required
          type="email"
          placeholder="Email*"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          required
          placeholder="Telefone*"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          required
          placeholder="CNPJ*"
          value={form.cnpj}
          onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />
        <select
          required
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        >
          <option value="">Finalidade da compra*</option>
          <option value="Consumo próprio">Consumo próprio</option>
          <option value="Revenda">Revenda</option>
          <option value="Especificação de projeto">Especificação de projeto</option>
          <option value="Cotação comparativa">Cotação comparativa</option>
          <option value="Outro">Outro</option>
        </select>
        <textarea
          placeholder="Mensagem"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="min-h-[100px] rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brand"
        />

        {error && <p className="text-sm font-semibold text-brand">{error}</p>}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {status === 'sending' ? 'Enviando…' : 'Solicitar uma cotação →'}
        </button>
      </form>
    </div>
  );
}
