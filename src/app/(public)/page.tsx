import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, getFilterTaxonomy } from '@/server/catalog';
import { pageMetadata } from '@/lib/seo';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ScrollCarousel } from '@/components/ScrollCarousel';
import { ClientsMarquee } from '@/components/ClientsMarquee';
import { FaqAccordion } from '@/components/FaqAccordion';
import { NewsletterForm } from '@/components/NewsletterForm';
import { DeviceFilterCard } from '@/components/home/DeviceFilterCard';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { r2Url } from '@/lib/utils';

export const metadata: Metadata = pageMetadata('/');

const LOTO_CATALOG_HREF = '/produtos/cadeados-de-bloqueio';
const MAOS_CATALOG_HREF = '/produtos/maos-seguras';

const FRENTES = [
  {
    title: 'Bloqueio e Etiquetagem',
    text: 'O kit certo para cada bloqueio. Cadeados, garras, kits de bloqueio e etiquetas para todos os tipos de energia. Encontre o dispositivo ideal para o seu programa LOTO com a qualidade que sua indústria exige.',
    href: LOTO_CATALOG_HREF,
    img: '/uploads/banner-lototo.jpg',
  },
  {
    title: 'Adequação Completa LOTOTO',
    text: 'Seu programa LOTO do zero à excelência. Diagnóstico, documentação, treinamento e implantação completa. Adeque sua empresa com um programa sob medida que traz agilidade e segurança para seus colaboradores.',
    href: '/servicos/lototo',
    img: '/uploads/cards/lototo.png',
  },
  {
    title: 'Adequação Completa NR-12',
    text: 'Máquinas seguras, operação protegida. Adequação completa de máquinas e equipamentos à NR-12. Das apreciações de riscos aos dispositivos de segurança — sua produção protegida do início ao fim.',
    href: '/servicos/nr12',
    img: '/uploads/cards/nr12.jpg',
  },
  {
    title: 'Adequação Completa Mãos Seguras',
    text: 'Mãos seguras, zero acidentes. Dispositivos e soluções que eliminam o risco de acidentes com as mãos na indústria. Uma camada extra de proteção que salva vidas e evita paradas na produção.',
    href: '/servicos/maos-seguras',
    img: '/uploads/cards/maos.png',
  },
];

const SETORES = [
  { id: 'alimentos', name: 'Indústria de Alimentos', img: '/uploads/setores/alimentos.jpg' },
  { id: 'papel', name: 'Papel e Celulose', img: '/uploads/setores/papel.jpg' },
  { id: 'metalurgia', name: 'Metalurgia e Siderurgia', img: '/uploads/setores/metalurgia.jpg' },
  { id: 'textil', name: 'Têxtil', img: '/uploads/setores/textil.jpeg' },
  { id: 'automotiva', name: 'Indústria Automotiva', img: '/uploads/setores/automotiva.jpg' },
  { id: 'quimica', name: 'Química e Petroquímica', img: '/uploads/setores/quimica.png' },
  { id: 'mineracao', name: 'Mineração', img: '/uploads/setores/mineracao.jpg' },
  { id: 'borracha', name: 'Borracha', img: '/uploads/setores/borracha.jpg' },
  { id: 'agronegocio', name: 'Agronegócio', img: '/uploads/setores/agronegocio.jpg' },
  { id: 'construcao', name: 'Construção Civil', img: '/uploads/setores/construcao.jpg' },
  { id: 'madeireira', name: 'Indústria Madeireira', img: '/uploads/setores/madeireira.jpg' },
  { id: 'plastico', name: 'Plásticos e Embalagens', img: '/uploads/setores/plastico.jpg' },
];

const FAQS = [
  {
    q: 'O que torna a JG2 referência em segurança, conformidade e adequação industrial?',
    a: 'A JG2® combina consultoria especializada, adequação técnica e fabricação própria para entregar soluções completas em segurança industrial. Nossa força está em atuar de forma integrada na implantação e adequação de Programas de Bloqueio, Etiquetagem e Teste (LOTOTO), no fornecimento de produtos de bloqueio com marca própria, na adequação completa à NR-12 e no desenvolvimento de soluções como dispositivos Mãos Seguras, cabines e salas industriais personalizadas e placas de sinalização. Assim, ajudamos a indústria a reduzir riscos, elevar a conformidade e fortalecer a segurança da operação com soluções aplicáveis à realidade da planta.',
  },
  {
    q: 'Como a JG2 entrega a adequação completa do programa LOTOTO?',
    a: 'Nossa atuação começa com a análise técnica da operação, dos equipamentos, das fontes de energia perigosa e da rotina das equipes em campo. A partir desse diagnóstico, estruturamos procedimentos, critérios de bloqueio, padronização operacional e toda a base necessária para que o programa funcione de forma prática, segura e auditável. Além da consultoria especializada, fornecemos a linha completa de produtos JG2® para bloqueio e etiquetagem, garantindo mais aderência entre procedimento, dispositivo e realidade operacional. O resultado é um programa mais consistente, com menos improviso, mais controle e maior proteção nas intervenções.',
  },
  {
    q: 'O que significa trabalhar com padrão ouro em práticas e normas de LOTOTO?',
    a: 'Significa implantar um programa estruturado com base nas principais referências técnicas nacionais e internacionais, sempre alinhado à realidade da planta. Nossa metodologia considera as exigências das NR-10, NR-12, NR-33, OSHA 1910.147 e ANSI/ASSP Z244.1, transformando essas normas em procedimentos claros, aplicáveis e rastreáveis. Esse padrão é reforçado pelo uso de produtos JG2®, desenvolvidos para oferecer confiabilidade, compatibilidade com diferentes cenários industriais e maior eficiência na aplicação dos bloqueios. Assim, entregamos um programa mais seguro, auditável e tecnicamente sólido.',
  },
  {
    q: 'Como a JG2 atua para garantir segurança total e conformidade na operação?',
    a: 'Atuamos em frentes integradas que combinam controle de energias perigosas, adequação normativa, proteção física de máquinas e soluções industriais personalizadas. Nossa abordagem une diagnóstico, projeto, implantação, fabricação e suporte técnico para que a segurança não fique apenas no papel, mas seja efetivamente aplicada na rotina operacional. Isso permite elevar o nível de conformidade da planta e, ao mesmo tempo, reduzir falhas, exposições e riscos críticos no campo.',
  },
  {
    q: 'Como a JG2 estrutura o controle de energias perigosas com LOTOTO?',
    a: 'Estruturamos o controle de energias perigosas a partir da identificação das fontes de risco, dos pontos de bloqueio e dos procedimentos necessários para cada intervenção. Desenvolvemos o processo completo de bloqueio, etiquetagem e teste, com foco em eliminar o risco de energização inesperada e tornar a execução mais segura e padronizada. Essa atuação fortalece o controle operacional, melhora a aderência das equipes aos procedimentos e reduz a exposição durante atividades de manutenção, limpeza, setup e inspeção.',
  },
  {
    q: 'Como a JG2 apoia a adequação completa à NR-12?',
    a: 'Nossa atuação em NR-12 envolve inventário de máquinas, apreciação de riscos, definição de prioridades e desenvolvimento de projetos de adequação sob medida para o parque fabril. Fabricamos e fornecemos proteções físicas, sistemas de intertravamento, paradas de emergência e demais soluções necessárias para atender aos requisitos da norma com viabilidade técnica e operacional. Dessa forma, entregamos adequações que aumentam a proteção dos operadores, elevam a conformidade e contribuem para a continuidade segura da operação.',
  },
  {
    q: 'Como os dispositivos Mãos Seguras contribuem para a prevenção de acidentes?',
    a: 'Os dispositivos Mãos Seguras são desenvolvidos para afastar as mãos do operador das zonas de risco durante atividades de apoio, alimentação, posicionamento, ajuste e manuseio. Essa solução reduz significativamente a exposição a acidentes, melhora a ergonomia do posto de trabalho e aumenta a segurança sem comprometer a produtividade. É uma resposta técnica e prática para operações que exigem repetitividade, precisão e proteção constante do colaborador.',
  },
  {
    q: 'Como o diagnóstico técnico ajuda a eliminar riscos na operação?',
    a: 'Nosso diagnóstico técnico avalia em campo as fontes de energia perigosa, os pontos de bloqueio, as condições elétricas e mecânicas, as proteções existentes e as necessidades de adequação da planta. Mais do que apontar falhas, esse levantamento gera clareza sobre prioridades, criticidade e caminhos técnicos para correção. A partir dele, estruturamos soluções completas para LOTOTO, NR-10, NR-12 e projetos industriais complementares, permitindo que a empresa avance com mais segurança, critério técnico e direcionamento.',
  },
  {
    q: 'Como a JG2 padroniza segurança para operações com múltiplas plantas?',
    a: 'Desenvolvemos programas com padrão técnico unificado para empresas que operam em múltiplas plantas, no Brasil e no exterior. Estruturamos diretrizes, critérios, procedimentos e soluções replicáveis, sempre ajustados à realidade de cada unidade, sem perder a governança global do programa. Isso garante mais consistência na aplicação dos bloqueios, melhor controle sobre auditorias, maior rastreabilidade das ações e um padrão de segurança mais sólido em toda a organização.',
  },
  {
    q: 'Como a JG2 define a solução certa para cada estágio da operação?',
    a: 'Cada operação tem um nível diferente de maturidade, risco, estrutura e necessidade de adequação. Por isso, definimos soluções conforme o estágio real da planta, desde a implantação completa de programas LOTOTO, NR-10 e NR-12 até a melhoria de sistemas já existentes. Nossa atuação combina diagnóstico técnico, adequação normativa, projetos sob medida e soluções industriais personalizadas, o que permite direcionar recursos com mais inteligência e entregar evolução concreta em segurança industrial.',
  },
  {
    q: 'Como funciona a capacitação imersiva da JG2 para segurança no campo?',
    a: 'Nossos treinamentos são desenvolvidos com base na realidade operacional da planta, e não apenas na teoria. Aplicamos capacitações em LOTOTO, NR-10, NR-12, NR-33 e NR-35, com exemplos práticos, simulações de intervenções e situações reais de risco. Esse formato aumenta a percepção de risco, corrige comportamentos inseguros e melhora a aplicação dos procedimentos no dia a dia. O impacto é direto: equipes mais preparadas, mais disciplinadas e mais aderentes aos padrões de segurança exigidos pela operação.',
  },
  {
    q: 'Como a JG2 garante resposta rápida com atendimento técnico de verdade?',
    a: 'Atuamos com agilidade, proximidade e suporte técnico contínuo, acompanhando cada demanda com profundidade e entendimento real da rotina industrial. Nossa estrutura permite responder com rapidez às necessidades relacionadas a programas LOTOTO, adequações normativas, dispositivos de bloqueio e etiquetagem, projetos especiais e outras demandas ligadas à segurança industrial. Isso reduz ruídos na execução, acelera decisões e dá mais confiança ao cliente ao longo de todo o projeto.',
  },
  {
    q: 'Como a JG2 integra segurança à rotina da operação?',
    a: 'Entendemos que segurança precisa fazer parte da lógica da operação, da liderança e do comportamento das equipes. Por isso, ajudamos a incorporar LOTOTO, NR-10 e NR-12 à rotina da planta de forma prática, fortalecendo a aplicação dos procedimentos e reduzindo desvios no campo. Essa integração torna a segurança mais presente no dia a dia, melhora a disciplina operacional e consolida um ambiente mais confiável, estável e protegido.',
  },
  {
    q: 'Por que a JG2 é o parceiro técnico ideal para a sua indústria?',
    a: 'Porque a JG2® entrega mais do que produtos ou serviços isolados. Nossa força está na atuação integrada entre consultoria técnica, adequação normativa, fabricação própria e suporte contínuo, sempre com foco em soluções aplicáveis à realidade da operação. Isso permite que a indústria conte com um parceiro capaz de diagnosticar, projetar, fabricar, implantar e sustentar melhorias em segurança industrial com visão técnica, consistência e compromisso de longo prazo.',
  },
];

const FEATURED_LOTO_CODES = [
  'JGL050-1', 'JGL051-2', 'JGL101-1', 'JGL102-1', 'JGL150-1', 'JGL150-5',
  'JGL251-1', 'JGL256-1', 'JGL303-1', 'JGL400-4', 'JGL500-2', 'JGL600-2', 'JGL705-1',
];
const FEATURED_MAOS_CODES = [
  'AV-MS-002', 'AV-MS-004', 'AV-MS-006', 'AV-MS-008', 'AV-MS-010',
  'AV-MS-011', 'AV-MS-012', 'AV-MS-013', 'AV-MS-018', 'AV-MS-022',
];

function sortByCodeOrder<T extends { code: string }>(items: T[], order: string[]): T[] {
  const byCode = new Map(items.map((i) => [i.code, i]));
  return order.map((c) => byCode.get(c)).filter((i): i is T => Boolean(i));
}

export default async function HomePage() {
  const [featuredLoto, featuredMaos, taxonomy] = await Promise.all([
    getFeaturedProducts(FEATURED_LOTO_CODES),
    getFeaturedProducts(FEATURED_MAOS_CODES),
    getFilterTaxonomy(),
  ]);
  const loto = sortByCodeOrder(featuredLoto, FEATURED_LOTO_CODES);
  const maos = sortByCodeOrder(featuredMaos, FEATURED_MAOS_CODES);

  return (
    <>
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-ink-deep py-20 text-white sm:min-h-[640px] lg:min-h-[720px]">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/75 to-ink-deep/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-deep/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1340px] px-7">
          <div className="max-w-3xl">
            <p className="inline-block rounded-full bg-brand px-3.5 py-2 text-sm font-bold uppercase tracking-wide text-white sm:text-base">Grupo JG2®</p>
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              Adequação Completa em Segurança Industrial
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Adequação NR-12, consultoria e dispositivos de bloqueio e etiquetagem (LOTO) e soluções
              para Mãos Seguras — reduzindo acidentes e garantindo conformidade nas operações industriais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ProposalRequestButton
                objective="Outro assunto"
                className="rounded-full bg-brand px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-light"
              >
                Solicitar proposta
              </ProposalRequestButton>
              <Link
                href="/produtos"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
              >
                Ver catálogo
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: 'Bloqueio e Etiquetagem LOTO', href: LOTO_CATALOG_HREF },
                { label: 'Consultoria LOTOTO', href: '/servicos/lototo' },
                { label: 'Consultoria NR-12', href: '/servicos/nr12' },
                { label: 'Consultoria Mãos Seguras', href: '/servicos/maos-seguras' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-white/15 bg-black/20 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {false && (
      <section className="mx-auto mt-8 max-w-[1340px] px-7">
        <ScrollCarousel
          autoPlay
          loopToStart
          gapClassName="gap-0"
          trackClassName="snap-x snap-mandatory divide-x divide-white/15 rounded-[20px] text-white"
        >
          {FRENTES.map((f, i) => (
            <Link
              key={f.title}
              href={f.href}
              className={`group flex w-full flex-none snap-start flex-col sm:w-1/2 lg:w-1/3 ${i % 2 === 0 ? 'bg-brand-dark' : 'bg-brand'}`}
            >
              <div className="flex flex-1 flex-col justify-between gap-5 px-8 py-9">
                <div>
                  <h3 className="font-display text-2xl font-bold leading-snug">{f.title}</h3>
                  <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-white/85">{f.text}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg transition group-hover:bg-white group-hover:text-brand">
                  →
                </span>
              </div>
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image src={r2Url(f.img)} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </Link>
          ))}
        </ScrollCarousel>
      </section>
      )}

      <ClientsMarquee />

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="relative overflow-hidden rounded-3xl bg-ink-deep p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(181,32,43,.30)_0%,transparent_70%)]" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-xl bg-brand">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                  </svg>
                </span>
                <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Filtro inteligente de bloqueio</p>
              </div>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight">
                Não sabe qual bloqueio escolher? A gente encontra para você.
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Selecione o tipo do seu dispositivo de isolamento — válvula, disjuntor, chave, plugue
                — e veja na hora apenas os produtos de bloqueio indicados para ele. Simples, visual e
                direto ao ponto.
              </p>
              <Link href={LOTO_CATALOG_HREF} className="mt-7 inline-block rounded-full bg-brand px-6 py-3 font-bold transition hover:bg-brand-light">
                Encontrar meu bloqueio →
              </Link>
            </div>
            <DeviceFilterCard taxonomy={taxonomy} />
          </div>
        </div>
      </section>

      <ActionBanner
        title="Adeque seu Programa LOTOTO com a Excelência e Expertise da JG2®"
        kicker="LOTOTO"
        kickerColor="text-white/90"
        heading="Seu Programa de Controle de Energias Perigosas no PADRÃO OURO"
        headingColor="text-white"
        text="Da identificação dos pontos de energia ao plano de bloqueio e etiquetagem — a JG2 entrega cada etapa da consultoria LOTOTO: levantamento técnico, matriz de bloqueio por equipamento, definição dos dispositivos, padronização dos procedimentos, treinamentos, auditorias e suporte contínuo para a operação."
        textColor="text-white/90"
        panelClassName="bg-[linear-gradient(135deg,#c8121f_0%,#a3101a_100%)]"
        imageSrc="/uploads/banner-lototo.jpg"
        ctaClassName="bg-white text-brand hover:bg-ink-deep hover:text-white"
        showAccent
        objective="Adequação LOTOTO"
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1340px] px-7">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Loja de bloqueio</p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">Produtos mais vendidos</h2>
            </div>
            <Link href="/produtos" className="font-bold text-brand hover:underline">
              Ver catálogo completo →
            </Link>
          </div>
          <ProductCarousel products={loto} autoPlay />
        </div>
      </section>

      <ActionBanner
        title="Adequação Completa à NR-12"
        kicker="NR-12"
        kickerColor="text-white/90"
        heading="NR-12: Conformidade completa para sua indústria"
        headingColor="text-white"
        text="Da apreciação de riscos ao laudo técnico com ART — a JG2 entrega cada etapa da adequação NR-12: inventário, apreciação de riscos, projetos conceituais e detalhados, fabricação personalizada, instalação, laudos técnicos, treinamentos e auditorias."
        textColor="text-white/90"
        panelClassName="bg-ink-deep"
        imageSrc="/uploads/banner-nr12.jpg"
        ctaClassName="bg-white text-ink hover:bg-brand hover:text-white"
        showAccent
        objective="Adequação NR-12"
      />

      <section className="bg-surface-footer py-16">
        <div className="mx-auto max-w-[1340px] px-7">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Proteção das mãos</p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">
                Dispositivos mãos seguras mais vendidos
              </h2>
            </div>
            <Link href={MAOS_CATALOG_HREF} className="font-bold text-brand hover:underline">
              Ver catálogo completo →
            </Link>
          </div>
          <ProductCarousel products={maos} autoPlay />
        </div>
      </section>

      <ActionBanner
        title="Reduza os Riscos dos Trabalhos Manuais Agora"
        kicker="MÃOS SEGURAS"
        kickerColor="text-white/90"
        heading="Mãos Seguras: Dispositivos Necessários para Sua Operação"
        headingColor="text-white"
        text="Te guiamos da identificação da aplicação ao apoio técnico especializado — a JG2 entrega cada etapa da solução Mãos Seguras: análise da demanda, definição do produto ideal, desenvolvimento da aplicação, suporte técnico e orientação para implementação segura na operação."
        textColor="text-white/90"
        panelClassName="bg-[linear-gradient(135deg,#c8121f_0%,#a3101a_100%)]"
        imageSrc="/uploads/banner-maos.png"
        imagePosition="object-top"
        ctaClassName="bg-white text-brand hover:bg-ink-deep hover:text-white"
        showAccent
        objective="Adequação Mãos Seguras"
      />

      <section className="mx-auto max-w-[1340px] px-7 py-16">
        <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Onde atuamos</p>
        <h2 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">Áreas de atuação</h2>
        <div className="mt-8">
          <ScrollCarousel autoPlay speed={65}>
            {SETORES.map((sec) => (
              <Link
                key={sec.id}
                href={`/setores/${sec.id}`}
                className="group relative flex h-[200px] w-[260px] flex-none items-end justify-between overflow-hidden rounded-2xl bg-ink p-4"
              >
                <Image src={r2Url(sec.img)} alt="" fill sizes="260px" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <span className="relative text-sm font-bold leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,.4)]">
                  {sec.name}
                </span>
                <span className="relative flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-brand text-white">
                  ↗
                </span>
              </Link>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-[1340px] gap-8 px-7 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Por que a JG2?</p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">
              Parceria completa em segurança e conformidade
            </h2>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg sm:min-h-[280px] lg:row-span-2 lg:min-h-full">
            <Image
              src={r2Url('/uploads/why-jg2.jpg')}
              alt="Equipe JG2 em operação industrial"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-16">
        <div className="relative grid gap-8 overflow-hidden rounded-3xl bg-brand p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full bg-white/6" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Catálogo JG2®</p>
            <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">Monte seu orçamento em minutos</h2>
            <p className="mt-3 max-w-md text-white/85">
              Cadeados, garras, bloqueios elétricos e de válvulas — adicione os itens e envie tudo de uma vez para a equipe comercial.
            </p>
            <Link href="/produtos" className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-extrabold text-brand transition hover:bg-ink-deep hover:text-white">
              Explorar catálogo →
            </Link>
          </div>
          <div className="relative flex h-[230px] items-center justify-center">
            <Image
              src={r2Url('/uploads/banner-catalogo-online.png')}
              alt="Catálogos JG2®"
              fill
              sizes="50vw"
              className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,.35)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 pb-16">
        <div className="grid gap-6 rounded-3xl border border-border-soft bg-surface-alt p-8 sm:p-10 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Newsletter</p>
            <h2 className="mt-1 font-display text-2xl font-black text-ink sm:text-3xl">Conteúdo técnico no seu e-mail</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-2">Novidades de produtos, normas e materiais para o time de segurança.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

function ActionBanner({
  title,
  kicker,
  kickerColor,
  heading,
  headingColor,
  text,
  textColor,
  panelClassName,
  imageSrc,
  imagePosition = 'object-center',
  ctaClassName,
  showAccent = false,
  objective,
}: {
  title: string;
  kicker?: string;
  kickerColor?: string;
  heading: string;
  headingColor: string;
  text: string;
  textColor: string;
  panelClassName: string;
  imageSrc: string;
  imagePosition?: string;
  ctaClassName: string;
  showAccent?: boolean;
  objective: string;
}) {
  return (
    <section className="mx-auto max-w-[1340px] px-7 py-8">
      {title && <p className="mb-5 text-center font-display text-lg font-black text-ink sm:text-xl">{title}</p>}
      <div className={`grid overflow-hidden rounded-3xl shadow-lg lg:grid-cols-[1fr_1.15fr] ${panelClassName}`}>
        <div className="relative min-h-[240px] overflow-hidden sm:min-h-[300px]">
          <Image
            src={r2Url(imageSrc)}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={`object-cover ${imagePosition}`}
          />
        </div>
        <div className="relative flex flex-col justify-center overflow-hidden p-8 sm:p-11">
          {showAccent && (
            <div className="pointer-events-none absolute -right-14 -top-14 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.12)_0%,transparent_70%)]" />
          )}
          {kicker && (
            <span className={`relative mb-3 inline-flex self-start rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide ${kickerColor}`}>
              {kicker}
            </span>
          )}
          <h3 className={`relative text-2xl font-black leading-tight sm:text-[28px] ${headingColor}`}>{heading}</h3>
          <p className={`relative mt-4 text-sm leading-relaxed sm:text-[15px] ${textColor}`}>{text}</p>
          <ProposalRequestButton
            objective={objective}
            className={`relative mt-7 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-bold transition ${ctaClassName}`}
          >
            Solicitar proposta <span aria-hidden>→</span>
          </ProposalRequestButton>
        </div>
      </div>
    </section>
  );
}
