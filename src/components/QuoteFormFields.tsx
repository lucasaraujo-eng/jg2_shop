'use client';

export type QuoteFormValue = {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  purpose: string;
  message: string;
};

export const PURPOSE_OPTIONS = [
  'Consumo próprio',
  'Revenda',
  'Especificação de projeto',
  'Cotação comparativa',
  'Outro',
];

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

/** Campos do drawer de orçamento (etapa 2). A página /orcamento tem seu próprio conjunto de campos — ver PageQuoteFormFields. */
export function QuoteFormFields({
  value,
  onChange,
}: {
  value: QuoteFormValue;
  onChange: (patch: Partial<QuoteFormValue>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Nome*</span>
        <input required value={value.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Seu nome" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Email*</span>
        <input
          required
          type="email"
          value={value.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="seu@email.com.br"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Telefone*</span>
        <input
          required
          value={value.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="(00) 00000 0000"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">CNPJ*</span>
        <input
          required
          value={value.cnpj}
          onChange={(e) => onChange({ cnpj: e.target.value })}
          placeholder="00.000.000/0000-00"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Finalidade da Compra*</span>
        <select required value={value.purpose} onChange={(e) => onChange({ purpose: e.target.value })} className={inputClass}>
          <option value="">Selecione...</option>
          {PURPOSE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Mensagem</span>
        <textarea
          value={value.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="Observações"
          rows={4}
          className={`${inputClass} resize-y`}
        />
      </label>
    </div>
  );
}

export function isQuoteFormValid(value: QuoteFormValue, privacyChecked: boolean): boolean {
  return (
    value.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(value.email) &&
    value.phone.trim().length >= 8 &&
    value.cnpj.trim().length >= 11 &&
    value.purpose.trim().length > 0 &&
    privacyChecked
  );
}
