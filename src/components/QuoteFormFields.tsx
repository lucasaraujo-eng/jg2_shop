'use client';

import { useState } from 'react';
import { isValidBrPhone, isValidCpfCnpj } from '@/lib/cpfCnpj';
import { formatCpfCnpj, formatPhone } from '@/lib/masks';

const EMAIL_RE = /\S+@\S+\.\S+/;
const errorClass = 'text-xs font-semibold text-brand';

export type DocType = 'cnpj' | 'cpf';

export type QuoteFormValue = {
  name: string;
  email: string;
  phone: string;
  docType: DocType;
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

export function QuoteFormFields({
  value,
  onChange,
}: {
  value: QuoteFormValue;
  onChange: (patch: Partial<QuoteFormValue>) => void;
}) {
  const [touched, setTouched] = useState({ email: false, phone: false, cnpj: false });
  const emailValid = EMAIL_RE.test(value.email);
  const phoneValid = isValidBrPhone(value.phone);
  const cnpjValid = isValidCpfCnpj(value.cnpj);
  const docLabel = value.docType === 'cpf' ? 'CPF' : 'CNPJ';

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
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="seu@email.com.br"
          className={inputClass}
        />
        {touched.email && value.email && !emailValid && <span className={errorClass}>E-mail inválido</span>}
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Telefone*</span>
        <input
          required
          value={value.phone}
          onChange={(e) => onChange({ phone: formatPhone(e.target.value) })}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="(00) 00000-0000"
          className={inputClass}
        />
        {touched.phone && value.phone && !phoneValid && <span className={errorClass}>Telefone inválido</span>}
      </label>
      <div className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Documento*</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input type="radio" name="docType" checked={value.docType === 'cnpj'} onChange={() => onChange({ docType: 'cnpj', cnpj: '' })} />
            CNPJ
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input type="radio" name="docType" checked={value.docType === 'cpf'} onChange={() => onChange({ docType: 'cpf', cnpj: '' })} />
            CPF
          </label>
        </div>
        <input
          required
          value={value.cnpj}
          onChange={(e) => onChange({ cnpj: formatCpfCnpj(e.target.value, value.docType) })}
          onBlur={() => setTouched((t) => ({ ...t, cnpj: true }))}
          placeholder={value.docType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
          className={inputClass}
        />
        {touched.cnpj && value.cnpj && !cnpjValid && <span className={errorClass}>{docLabel} inválido</span>}
      </div>
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
    isValidBrPhone(value.phone) &&
    isValidCpfCnpj(value.cnpj) &&
    value.purpose.trim().length > 0 &&
    privacyChecked
  );
}
