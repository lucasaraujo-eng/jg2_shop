const CLIENTS = [
  'Coca-Cola',
  'BRF',
  'Schmersal',
  'Volkswagen',
  'Bunge',
  'ArcelorMittal',
  'CSN',
  'Gerdau',
  'Cenibra',
  'Ball',
  'Vale',
  'Lactalis',
  'Aperam',
  'Klabin',
  'Usiminas',
];

/**
 * Sem os arquivos de logo reais (uploads/clientes/*.png) ainda, mostro o
 * nome de cada cliente em vez de <img> quebrada — troca por logo é só
 * substituir o conteúdo de cada pílula pela imagem.
 */
export function ClientsMarquee() {
  return (
    <section className="border-y border-border-soft bg-white py-10">
      <div className="mx-auto max-w-[1340px] px-7">
        <p className="mb-7 text-center font-display text-lg font-bold text-ink">
          Empresas Sérias Confiam na Experiência da JG2® Para Adequar Máquinas e Procedimentos
        </p>
      </div>
      <div className="jg-noscroll overflow-hidden">
        <div className="flex w-max gap-10" style={{ animation: 'jg-marquee 44s linear infinite' }}>
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-none rounded-full border border-border-soft px-6 py-2.5 font-display text-sm font-bold text-muted-2"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
