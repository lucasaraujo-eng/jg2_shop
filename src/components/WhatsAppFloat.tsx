/** Botão flutuante de WhatsApp, presente em todas as páginas públicas — igual ao protótipo (posição, cor, pulso), nunca implementado em nenhum dos blocos anteriores. */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5519994073970"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="jg-whatsapp-pulse fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-success shadow-[0_8px_24px_rgba(37,197,94,.45)] transition hover:bg-[#1eb152]"
    >
      <span className="relative block h-[22px] w-[26px] rounded-[13px_13px_13px_4px] bg-white">
        <span className="absolute left-1.5 top-[9px] h-1 w-1 rounded-full bg-success" />
        <span className="absolute left-[11px] top-[9px] h-1 w-1 rounded-full bg-success" />
        <span className="absolute left-4 top-[9px] h-1 w-1 rounded-full bg-success" />
      </span>
    </a>
  );
}
