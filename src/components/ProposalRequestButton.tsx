'use client';

import { useState } from 'react';
import { ProposalRequestModal } from '@/components/ProposalRequestModal';

export function ProposalRequestButton({
  objective,
  className,
  children,
  onClick,
}: {
  objective?: string;
  className: string;
  children: React.ReactNode;
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
