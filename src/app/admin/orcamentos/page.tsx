import { listAdminQuotes } from '@/server/actions/quotes';
import { QuoteStatusSelect } from '@/components/admin/QuoteStatusSelect';

export default async function AdminQuotesPage() {
  const quotes = await listAdminQuotes();

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-black text-ink">Orçamentos</h1>
        <p className="mt-1 text-sm text-tertiary">{quotes.length} solicitações recebidas.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {quotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-base font-black text-ink">
                  {q.name}
                  {q.company && <span className="font-sans text-sm font-semibold text-muted-2"> · {q.company}</span>}
                </p>
                <p className="mt-1 text-sm text-muted-2">
                  {q.email} · {q.phone}
                  {q.cnpj && <> · CNPJ {q.cnpj}</>}
                  {q.city && <> · {q.city}</>}
                </p>
                <p className="mt-1.5 font-mono text-xs text-tertiary">
                  {q.purpose && <>{q.purpose} · </>}
                  {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(q.createdAt)}
                </p>
              </div>
              <QuoteStatusSelect id={q.id} status={q.status} />
            </div>

            {q.message && <p className="mt-3.5 rounded-xl bg-surface-alt p-3.5 text-sm text-muted-2">{q.message}</p>}

            <ul className="mt-4 flex flex-col gap-1.5 border-t border-border-soft pt-3.5 text-sm">
              {q.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 text-muted-2">
                  <span className="truncate">
                    <span className="font-mono text-xs text-tertiary">{item.code}</span> {item.name}
                    {item.variantLabel && <span className="text-brand"> · {item.variantLabel}</span>}
                  </span>
                  <span className="flex-none font-bold text-ink">×{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {quotes.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-soft bg-white px-6 py-14 text-center shadow-sm">
            <span className="text-3xl">📬</span>
            <p className="text-sm font-semibold text-ink">Nenhum orçamento recebido ainda</p>
            <p className="text-sm text-tertiary">As solicitações do site aparecem aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}
