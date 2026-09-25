'use client';

import { useEffect, useState } from 'react';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';

const STORAGE_KEY = 'jg2-cookies-accepted';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
        <div className="mx-auto flex max-w-[900px] flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(20,18,16,.18)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted-2">
            Usamos cookies para melhorar sua experiência e analisar o uso do site.{' '}
            <button type="button" onClick={() => setPrivacyOpen(true)} className="font-bold text-brand underline">
              Política de privacidade
            </button>
          </p>
          <button
            type="button"
            onClick={accept}
            className="shrink-0 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-light"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
