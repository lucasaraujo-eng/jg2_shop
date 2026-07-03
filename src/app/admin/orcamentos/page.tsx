import { listAdminQuotes } from '@/server/actions/quotes';
import { QuoteStatusSelect } from '@/components/admin/QuoteStatusSelect';

export default async function AdminQuotesPage() {
  const quotes = await listAdminQuotes();

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Orçamentos ({quotes.length})</h1>

      <div className="mt-6 flex flex-col gap-4">
        {quotes.map((q) => (
          <div key={q.id} className="rounded-xl border border-border-soft bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  {q.name}
                  {q.company && <span className="font-normal text-muted-2"> · {q.company}</span>}
                </p>
                <p className="text-sm text-muted-2">
                  {q.email} · {q.phone}
                  {q.cnpj && <> · CNPJ {q.cnpj}</>}
                  {q.city && <> · {q.city}</>}
                </p>
                <p className="mt-1 text-xs text-tertiary">
                  {q.purpose && <>{q.purpose} · </>}
                  {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(q.createdAt)}
                </p>
              </div>
              <QuoteStatusSelect id={q.id} status={q.status} />
            </div>

            {q.message && <p className="mt-3 rounded-lg bg-surface-alt p-3 text-sm text-muted-2">{q.message}</p>}

            <ul className="mt-4 flex flex-col gap-1.5 border-t border-border-soft pt-4 text-sm">
              {q.items.map((item) => (
                <li key={item.id} className="flex justify-between text-muted-2">
                  <span>
                    <span className="font-mono text-xs text-tertiary">{item.code}</span> {item.name}
                    {item.variantLabel && <span className="text-brand"> · {item.variantLabel}</span>}
                  </span>
                  <span className="font-bold text-ink">×{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {quotes.length === 0 && (
          <p className="rounded-xl border border-border-soft bg-white p-6 text-center text-sm text-tertiary">
            Nenhum orçamento recebido ainda.
          </p>
        )}
      </div>
    </div>
  );
}
