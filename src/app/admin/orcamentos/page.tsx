import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

/** Stub (Bloco 1): confirma listagem + auth. UI completa entra no Bloco 7. */
export default async function AdminQuotesPage() {
  const session = await auth();
  if (!session?.user) return null; // middleware já redireciona; guarda extra

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Orçamentos ({quotes.length})</h1>
      <ul className="mt-6 flex flex-col gap-2">
        {quotes.map((q) => (
          <li key={q.id} className="rounded-lg border border-border-soft bg-white px-4 py-3 text-sm">
            <span className="font-semibold">{q.name}</span> — {q.email} — {q.items.length} item(ns){' '}
            <span className="text-tertiary">({q.status})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
