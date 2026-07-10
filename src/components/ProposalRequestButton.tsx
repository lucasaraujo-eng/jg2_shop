'use client';

import { useState } from 'react';
import { ProposalRequestModal } from '@/components/ProposalRequestModal';

/**
 * Substitui qualquer `<Link href="/contato">` que funcione como CTA de
 * contato/orçamento — abre o modal "Detalhar sua demanda" (mesmos campos do
 * carrinho) em vez de navegar para a página. `objective` pré-seleciona o
 * campo Objetivo do formulário; `className`/`children` ficam livres pra
 * reproduzir o visual exato do link que está sendo substituído.
 */
export function ProposalRequestButton({
  objective,
  className,
  children,
  onClick,
}: {
  objective?: string;
  className: string;
  children: React.ReactNode;
  /** Disparado junto com a abertura do modal — útil pra fechar um menu que estava envolvendo o botão. */
  onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          onClick?.();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </button>
      {open && <ProposalRequestModal onClose={() => setOpen(false)} defaultObjective={objective ?? ''} />}
    </>
  );
}
