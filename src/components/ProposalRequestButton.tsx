'use client';

import { useState } from 'react';
import { ProposalRequestModal } from '@/components/ProposalRequestModal';

/** Abre o modal "Detalhar sua demanda" em vez de navegar; `objective` pré-seleciona o campo Objetivo do formulário. */
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
