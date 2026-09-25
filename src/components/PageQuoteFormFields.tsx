'use client';

import { useState } from 'react';
import type { DocType } from '@/components/QuoteFormFields';
import { isValidBrPhone, isValidCpfCnpj } from '@/lib/cpfCnpj';
import { formatCep, formatCpfCnpj, formatPhone, isValidCep } from '@/lib/masks';

const EMAIL_RE = /\S+@\S+\.\S+/;
const errorClass = '-mt-1.5 text-xs font-semibold text-brand';

export type PageQuoteFormValue = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  docType: DocType;
  cnpj: string;
  address: string;
  cep: string;
  message: string;
};

const inputClass =
  'rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

export function PageQuoteFormFields({
  value,
  onChange,
}: {
  value: PageQuoteFormValue;
  onChange: (patch: Partial<PageQuoteFormValue>) => void;
}) {
  const [touched, setTouched] = useState({ email: false, phone: false, cnpj: false, cep: false });
  const emailValid = EMAIL_RE.test(value.email);
  const phoneValid = isValidBrPhone(value.phone);
  const cnpjValid = isValidCpfCnpj(value.cnpj);
  const cepValid = isValidCep(value.cep);
  const docLabel = value.docType === 'cpf' ? 'CPF' : 'CNPJ';
  const isCpf = value.docType === 'cpf';

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
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        placeholder="Email *"
        aria-label="Email"
        className={inputClass}
      />
      {touched.email && value.email && !emailValid && <span className={errorClass}>E-mail inválido</span>}
      <div className="flex gap-3">
        <input
          value={value.phone}
          onChange={(e) => onChange({ phone: formatPhone(e.target.value) })}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
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
      {touched.phone && value.phone && !phoneValid && <span className={errorClass}>Telefone inválido</span>}
      <div className="flex gap-4 text-sm text-ink">
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            name="page-docType"
            checked={value.docType === 'cnpj'}
            onChange={() => onChange({ docType: 'cnpj', cnpj: '', address: '', cep: '' })}
          />
          CNPJ
        </label>
        <label className="flex items-center gap-1.5">
          <input type="radio" name="page-docType" checked={value.docType === 'cpf'} onChange={() => onChange({ docType: 'cpf', cnpj: '' })} />
          CPF
        </label>
      </div>
      <input
        required
        value={value.cnpj}
        onChange={(e) => onChange({ cnpj: formatCpfCnpj(e.target.value, value.docType) })}
        onBlur={() => setTouched((t) => ({ ...t, cnpj: true }))}
        placeholder={value.docType === 'cpf' ? 'CPF *' : 'CNPJ *'}
        aria-label={value.docType === 'cpf' ? 'CPF' : 'CNPJ'}
        className={inputClass}
      />
      {touched.cnpj && value.cnpj && !cnpjValid && <span className={errorClass}>{docLabel} inválido</span>}
      {isCpf && (
        <>
          <input
            required
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Endereço *"
            aria-label="Endereço"
            className={inputClass}
          />
          <input
            required
            value={value.cep}
            onChange={(e) => onChange({ cep: formatCep(e.target.value) })}
            onBlur={() => setTouched((t) => ({ ...t, cep: true }))}
            placeholder="CEP *"
            aria-label="CEP"
            className={inputClass}
          />
          {touched.cep && value.cep && !cepValid && <span className={errorClass}>CEP inválido</span>}
        </>
      )}
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
  const cpfOk =
    value.docType !== 'cpf' || (value.address.trim().length >= 5 && isValidCep(value.cep));
  return (
    value.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(value.email) &&
    value.company.trim().length > 0 &&
    isValidCpfCnpj(value.cnpj) &&
    cpfOk
  );
}
