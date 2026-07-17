'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { getFilterTaxonomy } from '@/server/catalog';
import { r2Url } from '@/lib/utils';

type Taxonomy = Awaited<ReturnType<typeof getFilterTaxonomy>>;

export function DeviceFilterCard({ taxonomy }: { taxonomy: Taxonomy }) {
  const [applicationKey, setApplicationKey] = useState<string | null>(taxonomy[0]?.key ?? null);
  const application = taxonomy.find((a) => a.key === applicationKey) ?? null;

  if (!application) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,.34)]">
      <p className="font-mono text-xs uppercase tracking-widest text-brand">Tipo de aplicação</p>
      <div className="mt-3 flex gap-2">
        {taxonomy.map((app) => (
          <button
            key={app.key}
            type="button"
            onClick={() => setApplicationKey(app.key)}
            className={`rounded-lg px-4 py-2 text-[13.5px] font-bold transition ${
              applicationKey === app.key ? 'bg-brand text-white' : 'border border-border text-muted-2 hover:border-brand'
            }`}
          >
            {app.label}
          </button>
        ))}
      </div>

      <p className="mt-[18px] font-mono text-xs uppercase tracking-widest text-brand">Modelo do dispositivo</p>
      <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {application.models.map((m) => (
          <Link
            key={m.key}
            href={`/produtos?app=${application.key}&model=${m.key}`}
            className="flex flex-col items-center gap-1.5 rounded-lg border-2 border-border-soft p-2 transition hover:border-brand"
          >
            <Image src={r2Url(`/assets/filtro/${m.key}.png`)} alt="" width={120} height={54} className="h-[54px] w-full object-contain" />
            <span className="text-center text-xs font-semibold leading-tight text-muted-2">{m.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
