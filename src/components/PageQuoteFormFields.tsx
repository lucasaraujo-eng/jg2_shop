'use client';

export type PageQuoteFormValue = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

const inputClass =
  'rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

/** Campos da página /orcamento — inputs só com placeholder (sem label acima), igual ao protótipo. Distinto do formulário do drawer (ver QuoteFormFields). */
export function PageQuoteFormFields({
  value,
  onChange,
}: {
  value: PageQuoteFormValue;
  onChange: (patch: Partial<PageQuoteFormValue>) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <input
        required
        value={value.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Nome *"
        aria-label="Nome"
        className={inputClass}
      />
      <input
        required
        value={value.company}
        onChange={(e) => onChange({ company: e.target.value })}
        placeholder="Empresa *"
        aria-label="Empresa"
        className={inputClass}
      />
      <input
        required
        type="email"
        value={value.email}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="Email *"
        aria-label="Email"
        className={inputClass}
      />
      <div className="flex gap-3">
        <input
          value={value.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="Telefone"
          aria-label="Telefone"
          className={`${inputClass} min-w-0 flex-1`}
        />
        <input
          value={value.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="Cidade/UF"
          aria-label="Cidade/UF"
          className={`${inputClass} min-w-0 flex-1`}
        />
      </div>
      <textarea
        value={value.message}
        onChange={(e) => onChange({ message: e.target.value })}
        placeholder="Mensagem (opcional)"
        rows={3}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export function isPageQuoteFormValid(value: PageQuoteFormValue): boolean {
  return value.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(value.email) && value.company.trim().length > 0;
}
