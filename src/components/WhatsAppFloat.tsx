import Image from 'next/image';

/** Botão flutuante de WhatsApp, presente em todas as páginas públicas — igual ao protótipo (posição, pulso), nunca implementado em nenhum dos blocos anteriores. */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5531996690692"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="jg-whatsapp-pulse fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full transition hover:scale-105"
    >
      <Image src="/assets/logo_wapp.png" alt="WhatsApp" width={1019} height={1019} className="h-full w-full drop-shadow-[0_8px_24px_rgba(37,197,94,.45)]" />
    </a>
  );
}
