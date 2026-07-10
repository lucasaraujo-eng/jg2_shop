const CLIENTS = [
  { name: 'Coca-Cola', file: 'coca-cola' },
  { name: 'BRF', file: 'brf' },
  { name: 'Schmersal', file: 'schmersal' },
  { name: 'Volkswagen', file: 'volkswagen' },
  { name: 'Bunge', file: 'bunge' },
  { name: 'ArcelorMittal', file: 'arcelormittal' },
  { name: 'CSN', file: 'csn' },
  { name: 'Gerdau', file: 'gerdau' },
  { name: 'Cenibra', file: 'cenibra' },
  { name: 'Ball', file: 'ball' },
  { name: 'Vale', file: 'vale' },
  { name: 'Lactalis', file: 'lactalis' },
  { name: 'Aperam', file: 'aperam' },
  { name: 'Klabin', file: 'klabin' },
  { name: 'Usiminas', file: 'usiminas' },
];

export function ClientsMarquee() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-[1340px] px-7">
        <p className="mb-7 text-center font-display text-lg font-bold text-ink">
          Empresas Sérias Confiam na Experiência da JG2® Para Adequar Máquinas e Procedimentos
        </p>
      </div>
      <div className="jg-noscroll overflow-hidden">
        <div className="flex w-max items-center gap-10 hover:[animation-play-state:paused]" style={{ animation: 'jg-marquee 44s linear infinite' }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex h-14 flex-none items-center justify-center px-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/uploads/clientes/${c.file}.png`}
                alt={c.name}
                className="h-14 w-[150px] object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
