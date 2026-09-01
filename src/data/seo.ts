export type RelatedLink = { label: string; href: string };

export type SupportArticleData = {
  heading: string;
  tldr: string;
  idealFor: string;
  notFor: string;
  tableHeaders: string[];
  tableRows: string[][];
  faqs: { q: string; a: string }[];
  tip: string;
  related: RelatedLink[];
};

export type PageSeo = {
  title: string;
  description: string;
  support?: SupportArticleData;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'JG2 Segurança | Etiquetagem LOTO, Adequação NR-12 e Mais',
    description:
      'Fabricante de dispositivos de bloqueio e etiquetagem LOTO para adequação NR-12 e NR-10. Cadeados, garras e kits industriais. Solicite seu orçamento.',
  },

  '/produtos': {
    title: 'Catálogo de Bloqueio e Etiquetagem LOTO Industrial | JG2',
    description:
      'Loja de produtos para segurança do trabalho: cadeados, garras, bloqueios elétricos e de válvulas, caixas e etiquetas LOTO. Monte seu orçamento agora.',
    support: {
      heading: 'Catálogo JG2: todos os dispositivos de bloqueio e etiquetagem (LOTO) em um só lugar',
      tldr: 'Catálogo online que reúne as 7 categorias de dispositivos de bloqueio e etiquetagem da JG2® — cadeados, garras, bloqueios elétricos, bloqueio de válvulas, caixas e estações, etiquetas e placas, malas e bolsas —, com filtro por tipo de aplicação (mecânico ou elétrico) para montar orçamento direto no site.',
      idealFor:
        'quem já sabe o tipo de ponto de energia que precisa isolar e quer navegar direto por categoria; gestores de compras que precisam consolidar uma lista de itens para orçamento único.',
      notFor:
        'quem busca diagnóstico ou implantação de programa (nesse caso, a Consultoria LOTOTO é o caminho mais indicado antes da compra avulsa).',
      tableHeaders: ['Categoria', 'O que cobre'],
      tableRows: [
        ['Cadeados de Bloqueio', 'Bloqueio individual de pontos de energia'],
        ['Garras de Bloqueio', 'Bloqueio coletivo do mesmo ponto'],
        ['Bloqueios Elétricos', 'Disjuntores, tomadas, botoeiras, painéis'],
        ['Bloqueio de Válvulas', 'Válvulas gaveta, esfera, borboleta, pneumática'],
        ['Caixas e Estações', 'Centralização e organização do bloqueio coletivo'],
        ['Etiquetas e Placas', 'Identificação e rastreabilidade do bloqueio'],
        ['Malas e Bolsas', 'Transporte do kit LOTO entre pontos da planta'],
      ],
      faqs: [
        {
          q: 'O catálogo já resolve a adequação à NR-12?',
          a: 'Não diretamente. O catálogo reúne produtos de bloqueio e etiquetagem (LOTO); a adequação de máquinas à NR-12 depende de projeto de engenharia conduzido pela consultoria especializada.',
        },
        {
          q: 'É possível montar um orçamento com itens de categorias diferentes?',
          a: 'Sim. O catálogo permite adicionar produtos de qualquer categoria ao mesmo orçamento e enviar tudo de uma vez para a equipe comercial.',
        },
        {
          q: 'Qual a diferença entre o filtro "mecânico" e "elétrico"?',
          a: 'A diferença é o tipo de ponto de isolamento: o filtro mecânico cobre válvulas, alavancas e flanges, enquanto o elétrico cobre disjuntores, tomadas e chaves seletoras.',
        },
      ],
      tip: 'O erro mais comum é escolher o produto apenas pelo nome da categoria, sem usar o filtro de tipo de aplicação. Isso aumenta o risco de comprar um item mecânico para um ponto elétrico (ou o contrário), gerando devolução e atraso na implantação do bloqueio.',
      related: [
        { label: 'Cadeados de Bloqueio', href: '/produtos/cadeados-de-bloqueio' },
        { label: 'Garras de Bloqueio', href: '/produtos/garras-de-bloqueio' },
      ],
    },
  },

  '/produtos/maos-seguras': {
    title: 'Dispositivos Mãos Seguras contra Acidentes Industriais | JG2',
    description:
      'Proteção das mãos em máquinas: extensores, redutores de risco e dispositivos ergonômicos para reduzir acidentes de prensamento na indústria. Peça orçamento.',
    support: {
      heading: 'Dispositivos Mãos Seguras: eliminando o contato manual com a zona de risco',
      tldr: 'Linha de dispositivos de engenharia para reduzir acidentes com as mãos (prensamento, corte, impacto), organizada em cinco frentes: Extensores Industriais, Proteção de Impacto, Movimentação e Transporte, Armazenamento Seguro e Fixação e Ajuste.',
      idealFor:
        'tarefas com risco de prensamento, esmagamento ou corte no manuseio manual de peças, cargas ou ferramentas; operações de movimentação de tambores, paletes e cargas suspensas.',
      notFor:
        'substituir o bloqueio de energia em manutenções — para isso, o procedimento correto é o bloqueio e etiquetagem com Cadeados de Bloqueio.',
      tableHeaders: ['Categoria', 'Função', 'Exemplo de aplicação'],
      tableRows: [
        ['Extensores Industriais', 'Afastar a mão da zona de perigo', 'Retirada de calço, cargas suspensas'],
        ['Proteção de Impacto', 'Reduzir esmagamento e corte', 'Talhadeira, punção, chave de impacto'],
        ['Movimentação e Transporte', 'Proteger a mão no manuseio de cargas', 'Caminhão, carrinho de mão, tambor'],
        ['Armazenamento Seguro', 'Guardar ferramentas cortantes', 'Disco de corte'],
        ['Fixação e Ajuste', 'Manter a peça fixa sem uso da mão', 'Abertura de tambor, dobra de chapas'],
      ],
      faqs: [
        {
          q: 'Os dispositivos mãos seguras substituem o uso de luvas (EPI)?',
          a: 'Não. Eles reduzem a exposição da mão à zona de perigo, mas atuam em conjunto com os EPIs exigidos pela atividade, não como substituto.',
        },
        {
          q: 'Qual a diferença entre extensores e dispositivos de fixação e ajuste?',
          a: 'A diferença é a função: os extensores afastam a mão do ponto de risco em tarefas de alcance, enquanto os dispositivos de fixação seguram a peça no lugar da mão do operador.',
        },
        {
          q: 'Existe dispositivo específico para manuseio de tambores?',
          a: 'Sim. A linha inclui dispositivos ergonômicos dedicados à movimentação, transporte e abertura segura de barris e tambores industriais.',
        },
      ],
      tip: 'O erro mais comum é escolher o dispositivo pelo tipo de ferramenta usada na tarefa, sem antes mapear o ponto exato de exposição da mão durante o movimento — o que resulta em peça tecnicamente correta, mas mal posicionada na operação real.',
      related: [
        { label: 'Cadeados de Bloqueio', href: '/produtos/cadeados-de-bloqueio' },
        { label: 'Consultoria em Segurança das Mãos', href: '/servicos/maos-seguras' },
      ],
    },
  },

  '/servicos/lototo': {
    title: 'Consultoria LOTOTO: Sistema de Bloqueio e Etiquetagem | JG2',
    description:
      'Sistema LOTO completo: levantamento técnico, matrizes de bloqueio, treinamento e software para controle de energia perigosa. Solicite avaliação técnica.',
    support: {
      heading: 'Consultoria LOTOTO JG2: programa completo de controle de energias perigosas',
      tldr: 'Consultoria que conduz o programa LOTO do zero à maturidade — levantamento técnico (Gemba Day), matrizes de bloqueio, lista detalhada de dispositivos, fornecimento, treinamento, auditorias e gestão contínua pelo software JG2 Smart Loto®.',
      idealFor:
        'empresas com matrizes de bloqueio incompletas ou implantação parcial de um programa LOTO anterior; empresas iniciando o programa do zero e que precisam de visão completa de implantação.',
      notFor: 'quem busca apenas comprar dispositivos avulsos sem estruturar o programa — nesse caso, o Catálogo atende diretamente.',
      tableHeaders: ['Etapa', 'Entregável'],
      tableRows: [
        ['Gemba Day', 'Levantamento técnico das fontes de energia'],
        ['Matrizes de bloqueio', 'Sequência de bloqueio e desbloqueio por equipamento'],
        ['Lista detalhada', 'Modelos e quantitativos de dispositivos por turno'],
        ['Fornecimento', 'Dispositivos de bloqueio e etiquetagem JG2®'],
        ['Treinamento', 'Capacitação prática das equipes'],
        ['Auditorias', 'Verificação periódica de eficácia e maturidade'],
        ['Software JG2 Smart Loto®', 'Gestão contínua, indicadores e estoque'],
      ],
      faqs: [
        {
          q: 'A JG2 faz apenas consultoria ou também fornece os dispositivos?',
          a: 'Sim, ambos. A consultoria cobre desde o levantamento técnico até o fornecimento e a distribuição dos dispositivos de bloqueio e etiquetagem.',
        },
        {
          q: 'Uma empresa que já tem programa LOTO pode contratar a consultoria?',
          a: 'Sim. A JG2 revisa e evolui programas já existentes, identificando lacunas e reestruturando matrizes incompletas.',
        },
        {
          q: 'O software substitui a implantação do programa?',
          a: 'Não. O JG2 Smart Loto® é a camada de gestão contínua — matrizes, auditorias, indicadores —, mas depende de um programa LOTO já implantado como base.',
        },
      ],
      tip: 'O erro mais comum é tratar o LOTOTO como um projeto pontual de aquisição de cadeados, sem levantamento técnico prévio, o que resulta em matrizes de bloqueio incompletas e falhas na verificação de energia zero.',
      related: [
        { label: 'Catálogo de produtos', href: '/produtos' },
        { label: 'Downloads / Catálogos em PDF', href: '/downloads' },
      ],
    },
  },

  '/servicos/nr12': {
    title: 'Consultoria NR-12: Adequação Completa com Laudo | JG2',
    description:
      'Adequação NR-12 completa: inventário, apreciação de riscos, projetos, fabricação de proteções e laudo de conformidade NR-12. Solicite avaliação técnica.',
    support: {
      heading: 'Consultoria NR-12 JG2: do inventário de máquinas ao laudo de conformidade',
      tldr: 'Adequação completa de máquinas e equipamentos à NR-12 — inventário, apreciação de riscos com base em ISO 12100, ISO 13849 e NBR 14153, projetos, fabricação e instalação de proteções, laudo de conformidade, manuais e treinamento.',
      idealFor:
        'empresas com parque fabril não inventariado ou com adequações anteriores feitas por fornecedores desconexos; gestores que precisam apresentar um plano de investimento faseado à diretoria.',
      notFor:
        'quem busca apenas comprar um dispositivo de bloqueio pontual sem projeto de engenharia — nesse caso, o Catálogo já resolve.',
      tableHeaders: ['Etapa', 'Entregável'],
      tableRows: [
        ['Inventário de máquinas', 'Planilha e documento técnico do parque fabril'],
        ['Apreciação de riscos', 'Identificação de perigos e medidas de redução'],
        ['Projetos conceituais e detalhados', 'Solução mecânica, elétrica, pneumática e hidráulica'],
        ['Fabricação e instalação', 'Proteções em aço inox ou galvanizado'],
        ['Laudo de conformidade', 'Validação técnica da condição final da máquina'],
        ['Manuais e treinamento', 'Orientação de uso e capacitação das equipes'],
      ],
      faqs: [
        {
          q: 'A JG2 entrega laudo de conformidade NR-12?',
          a: 'Sim. O laudo final é sustentado por nova apreciação de riscos e validação técnica da condição final da máquina.',
        },
        {
          q: 'É possível adequar as máquinas por etapas?',
          a: 'Sim. A adequação pode ser faseada, priorizando máquinas críticas sem perder a lógica técnica do projeto completo.',
        },
        {
          q: 'A JG2 exige uma marca específica de dispositivo de proteção?',
          a: 'Não. Os dispositivos são definidos pela exigência técnica e pela necessidade real da planta, sem exclusividade de marca.',
        },
      ],
      tip: 'O erro mais comum é contratar separadamente apreciação de riscos, projeto e instalação com fornecedores diferentes, o que costuma gerar documentação que não conversa com a execução e retrabalho no laudo final.',
      related: [
        { label: 'Downloads / Guia de Adequação NR-12', href: '/downloads' },
        { label: 'Consultoria LOTOTO', href: '/servicos/lototo' },
      ],
    },
  },

  '/servicos/maos-seguras': {
    title: 'Consultoria em Segurança das Mãos e Ergonomia | JG2',
    description:
      'Ergonomia industrial e engenharia aplicada para reduzir riscos de acidentes com as mãos, com dispositivos personalizados. Solicite avaliação técnica agora.',
    support: {
      heading: 'Consultoria em Segurança das Mãos JG2: engenharia aplicada à atividade real',
      tldr: 'Consultoria que desenvolve dispositivos personalizados para reduzir acidentes com as mãos, partindo do levantamento da atividade real em campo até a fabricação sob medida em aço galvanizado com pintura eletrostática ou aço inox.',
      idealFor:
        'operações que ainda dependem de hábito ou ferramenta inadequada em tarefas com risco de contato manual; empresas com histórico de cortes, esmagamentos ou perfurações em atividades manuais recorrentes.',
      notFor:
        'isolamento de energia em manutenção de máquinas — nesse caso, o procedimento correto é o programa da Consultoria LOTOTO.',
      tableHeaders: ['Etapa', 'Entregável'],
      tableRows: [
        ['Atendimento especializado', 'Diagnóstico técnico do cenário'],
        ['Levantamento de atividades', 'Mapeamento do ponto exato de exposição'],
        ['Projetos conceituais e detalhados', 'Validação da solução antes da fabricação'],
        ['Fabricação personalizada', 'Dispositivo sob medida em aço inox ou galvanizado'],
        ['Fornecimento', 'Entrega alinhada ao que foi projetado'],
        ['Auditorias', 'Revisão periódica da solução aplicada'],
      ],
      faqs: [
        {
          q: 'Os dispositivos são padronizados ou personalizados?',
          a: 'Personalizados. Cada dispositivo é desenvolvido sob medida para a atividade específica, validado em projeto antes da fabricação.',
        },
        {
          q: 'A consultoria considera apenas segurança ou também ergonomia?',
          a: 'Ambas. O levantamento de atividades avalia movimentos, alcances e rotinas, unindo redução de risco com conforto ergonômico do operador.',
        },
        {
          q: 'A JG2 vende apenas dispositivos ou também faz consultoria completa?',
          a: 'Ambos. É possível contratar a consultoria completa, do diagnóstico à aplicação, ou adquirir diretamente os dispositivos já catalogados de mãos seguras.',
        },
      ],
      tip: 'O erro mais comum é tentar resolver um risco de contato manual comprando um dispositivo genérico de catálogo sem levantamento prévio da atividade, o que resulta em peça tecnicamente correta, mas mal posicionada na operação real.',
      related: [
        { label: 'Dispositivos Mãos Seguras', href: '/produtos/maos-seguras' },
        { label: 'Consultoria NR-12', href: '/servicos/nr12' },
      ],
    },
  },

  '/downloads': {
    title: 'Baixe o Catálogo de Bloqueio e Etiquetagem LOTO | JG2',
    description:
      'Catálogos JG2 em PDF de bloqueio e etiquetagem LOTO, dispositivos mãos seguras e guia de adequação NR-12. Material técnico gratuito. Baixe agora!',
    support: {
      heading: 'Catálogos e Manuais JG2 em PDF: material técnico gratuito',
      tldr: 'Central de downloads com catálogo geral de segurança industrial, catálogo de bloqueio e etiquetagem (LOTOTO), catálogo de dispositivos mãos seguras, catálogo de gradil de segurança e guia de adequação à NR-12, todos em PDF gratuito.',
      idealFor:
        'especificar produtos antes de solicitar orçamento; engenheiros de segurança que precisam de material de referência técnica para apresentação interna.',
      notFor:
        'quem precisa da ficha técnica individual e detalhada de um SKU específico — essa fica disponível na própria página de cada produto do Catálogo.',
      tableHeaders: ['Material', 'Conteúdo'],
      tableRows: [
        ['Segurança Industrial (catálogo geral)', 'Portfólio completo do Grupo JG2®'],
        ['LOTOTO — Bloqueio e Etiquetagem', 'Cadeados, garras, etiquetas, bloqueios de válvula e elétricos'],
        ['Dispositivos Mãos Seguras', 'Proteções para prevenção de acidentes com as mãos'],
        ['Gradil de Segurança', 'Grades e barreiras modulares'],
        ['Adequação à NR-12', 'Guia de soluções JG2® para NR-12'],
      ],
      faqs: [
        {
          q: 'Os catálogos substituem o orçamento formal?',
          a: 'Não. Eles servem para especificação e consulta técnica; o orçamento com valores e prazos é feito à parte, direto com a equipe comercial.',
        },
        {
          q: 'Existe ficha técnica individual de cada produto?',
          a: 'Sim. Cada página de produto do catálogo online disponibiliza a ficha técnica específica em PDF daquele item.',
        },
        {
          q: 'O guia de NR-12 substitui a consultoria de adequação?',
          a: 'Não. O guia é um material de referência sobre as soluções JG2® para NR-12; a adequação efetiva da máquina depende do serviço de consultoria técnica.',
        },
      ],
      tip: 'O erro mais comum é baixar apenas o catálogo geral e tentar especificar um dispositivo técnico complexo sem consultar a ficha técnica individual do SKU, o que aumenta o risco de erro de compra.',
      related: [
        { label: 'Catálogo de produtos', href: '/produtos' },
        { label: 'Consultoria LOTOTO', href: '/servicos/lototo' },
      ],
    },
  },

  '/produtos/cadeados-de-bloqueio': {
    title: 'Cadeado de Bloqueio de Segurança Industrial LOTO | JG2',
    description:
      'Cadeados de bloqueio em aço cromado, inox, alumínio e plástico, disponíveis em várias cores para programas LOTO industriais. Solicite seu orçamento agora.',
    support: {
      heading: 'Cadeado de Bloqueio de Segurança: a base de qualquer programa LOTO',
      tldr: 'Categoria com cadeados de bloqueio (LOTO) da JG2® em cinco materiais de haste — aço cromado, aço inox, alumínio e plástico não condutivo —, com sistema de segredo configurável (diferentes, iguais ou chave mestra) e cores intercambiáveis para identificação por operador.',
      idealFor:
        'bloqueio individual de pontos de energia perigosa; ambientes corrosivos ou de contato com alimentos (haste em aço inox); ambientes com risco de condutividade elétrica (haste plástica não condutiva).',
      notFor: 'bloqueio coletivo do mesmo ponto por vários trabalhadores simultaneamente — nesse caso, use uma Garra de Bloqueio.',
      tableHeaders: ['Modelo', 'Material da haste', 'Diâmetro x altura', 'Aplicação recomendada'],
      tableRows: [
        ['JGL050-1', 'Aço cromado', 'Ø6,3 mm x 38 mm', 'Uso geral industrial'],
        ['JGL050-2', 'Aço cromado', 'Ø6,3 mm x 50 mm', 'Pontos com espessura maior'],
        ['JGL051-2', 'Plástico', 'Ø6,3 mm x 38 mm', 'Ambientes elétricos / não condutivos'],
        ['JGL052-1', 'Alumínio', 'Ø6,3 mm x 38 mm', 'Aplicações que exigem menor peso'],
        ['JGL053-1', 'Aço inox', 'Ø6,3 mm x 38 mm', 'Ambientes corrosivos ou alimentícios'],
      ],
      faqs: [
        {
          q: 'Qual a diferença entre segredos iguais, diferentes e chave mestra?',
          a: 'A diferença é o nível de controle de acesso. Segredos diferentes garantem que cada cadeado só abra com sua própria chave; segredos iguais permitem que um grupo compartilhe a mesma chave; chave mestra permite que uma chave administrativa abra qualquer cadeado do lote.',
        },
        {
          q: 'Cadeado de haste plástica é seguro para bloqueio elétrico?',
          a: 'Sim. O corpo não condutivo em plástico com chave em aço foi desenvolvido para reduzir o risco de condução elétrica próximo a circuitos energizados.',
        },
        {
          q: 'Um único modelo de cadeado atende a qualquer norma de segurança?',
          a: 'Não. Os cadeados JG2® são aplicáveis a procedimentos em linha com NR-10, NR-12, NR-33, OSHA 29 CFR 1910.147 e ANSI/ASSP Z244.1, mas a escolha do material deve considerar o ambiente específico.',
        },
      ],
      tip: 'O erro mais comum é tratar a cor do cadeado como decoração e não como ferramenta de gestão. Sem um padrão de cor por operador, turno ou tipo de energia, a rastreabilidade do programa LOTO cai justamente no momento em que mais importa.',
      related: [
        { label: 'Cadeado JGL050-1', href: '/produto/JGL050-1' },
        { label: 'Garras de Bloqueio', href: '/produtos/garras-de-bloqueio' },
      ],
    },
  },

  '/produtos/garras-de-bloqueio': {
    title: 'Garra de Bloqueio Coletivo para Programa LOTO | JG2',
    description:
      'Multiplicador de bloqueio tipo garra em plástico, aço cromado, alumínio e nylon para bloqueio coletivo simultâneo por vários trabalhadores. Peça orçamento.',
    support: {
      heading: 'Garra de Bloqueio: multiplicando a segurança em bloqueios coletivos',
      tldr: 'Linha de garras de bloqueio (multiplicadores tipo garra) que permite que vários trabalhadores apliquem cadeados individuais no mesmo ponto de isolamento, disponível em corpo plástico com haste em aço cromado ou alumínio (25 mm e 38 mm) e versão não condutiva em nylon.',
      idealFor:
        'intervenções com múltiplos trabalhadores ou turnos no mesmo ponto de energia perigosa; ambientes elétricos, onde a versão em nylon reduz o risco de condução.',
      notFor: 'bloqueio de um único ponto por um único trabalhador — nesse caso, um Cadeado de Bloqueio avulso já resolve.',
      tableHeaders: ['Modelo', 'Material', 'Abertura', 'Indicação'],
      tableRows: [
        ['JGL100-1', 'Plástico / aço cromado', '1" (25 mm)', 'Bloqueio coletivo padrão'],
        ['JGL100-2', 'Plástico / aço cromado', '1.1/2" (38 mm)', 'Pontos com haste maior'],
        ['JGL101-1', 'Plástico / alumínio', '1.1/2" (38 mm)', 'Aplicações que exigem menor peso'],
        ['JGL102-1', 'Nylon não condutora', 'Gancho 6 mm', 'Risco de condutividade elétrica'],
      ],
      faqs: [
        {
          q: 'A garra de bloqueio substitui o cadeado individual?',
          a: 'Não. A garra multiplica o ponto físico de bloqueio, mas cada trabalhador continua aplicando seu próprio cadeado pessoal em um dos furos disponíveis.',
        },
        {
          q: 'Quantos trabalhadores podem bloquear o mesmo ponto com uma garra?',
          a: 'Depende do modelo, mas o princípio é o mesmo em toda a linha: cada furo corresponde a um cadeado de um trabalhador diferente, e o ponto só é liberado quando todos os cadeados forem retirados.',
        },
        {
          q: 'Qual a diferença entre a garra em aço cromado e a em nylon?',
          a: 'A diferença é a condutividade. A versão em nylon é não condutiva, indicada para risco elétrico, enquanto a versão em aço cromado prioriza resistência mecânica para uso geral.',
        },
      ],
      tip: 'O erro mais frequente é dimensionar a garra apenas pelo número de trabalhadores do turno atual, sem considerar picos de manutenção com equipes maiores, o que leva a bloqueios paralelos improvisados.',
      related: [
        { label: 'Garra JGL100-1', href: '/produto/JGL100-1' },
        { label: 'Bloqueios Elétricos', href: '/produtos/bloqueios-eletricos' },
      ],
    },
  },

  '/produtos/bloqueios-eletricos': {
    title: 'Bloqueio Elétrico para Disjuntor e Painel LOTO | JG2',
    description:
      'Dispositivos de bloqueio para disjuntores, tomadas, plugues e painéis elétricos, normas DIN e NEMA, para procedimentos LOTO seguros. Solicite orçamento.',
    support: {
      heading: 'Bloqueio Elétrico: isolamento seguro de disjuntores, painéis e tomadas',
      tldr: 'Maior categoria do catálogo JG2®, com mais de 30 modelos de bloqueio elétrico para disjuntores (normas DIN e NEMA), botões e chaves seletoras, painéis, tomadas, plugues e controles remotos de ponte rolante.',
      idealFor:
        'isolar fisicamente disjuntores, botoeiras, chaves seletoras e tomadas durante manutenção elétrica, cobrindo padrões DIN e NEMA/caixa moldada por faixa de voltagem.',
      notFor: 'bloqueio de válvulas ou dispositivos mecânicos — nesse caso, consulte Bloqueio de Válvulas.',
      tableHeaders: ['Grupo de produto', 'Aplicação', 'Exemplos de modelo'],
      tableRows: [
        ['Disjuntor norma DIN', 'Padrão europeu/brasileiro', 'JGL150-1 a JGL150-6'],
        ['Disjuntor NEMA / caixa moldada', 'Padrão americano, por voltagem', 'JGL151-1 a JGL151-5'],
        ['Botões e chaves seletoras', 'Painéis de comando em acrílico', 'JGL200 a JGL207'],
        ['Tomadas e plugues', '110V, 220V, 16A, 32A, 63A', 'JGL400-1 a JGL400-5'],
        ['Controle remoto de ponte rolante', 'Bloqueio de comando suspenso', 'JGL801-1 a JGL801-3'],
      ],
      faqs: [
        {
          q: 'O bloqueio elétrico substitui o desligamento no quadro de força?',
          a: 'Não. Ele complementa a desenergização, impedindo apenas o religamento físico do disjuntor, botão ou tomada.',
        },
        {
          q: 'Qual a diferença entre disjuntor padrão DIN e NEMA?',
          a: 'A diferença é o padrão construtivo: DIN é predominante em instalações europeias e brasileiras, enquanto NEMA (caixa moldada) segue o padrão americano.',
        },
        {
          q: 'É possível bloquear uma tomada comum de 110V?',
          a: 'Sim. Existem dispositivos específicos para tomada simples de 110V e 220V, além de modelos por amperagem de plugue.',
        },
      ],
      tip: 'O erro técnico mais comum é escolher o dispositivo pelo nome genérico "bloqueio para disjuntor" sem conferir se ele é padrão DIN ou NEMA/caixa moldada — as geometrias são diferentes e um modelo incompatível não encaixa.',
      related: [
        { label: 'Bloqueio JGL150-1', href: '/produto/JGL150-1' },
        { label: 'Bloqueio de Válvulas', href: '/produtos/bloqueio-de-valvulas' },
      ],
    },
  },

  '/produtos/bloqueio-de-valvulas': {
    title: 'Bloqueio de Válvula Esfera, Gaveta e Pneumática | JG2',
    description:
      'Dispositivos de bloqueio para válvula esfera, gaveta, globo, borboleta e pneumática, em aço e alumínio, para isolamento seguro. Solicite seu orçamento.',
    support: {
      heading: 'Bloqueio de Válvula: esfera, gaveta, borboleta e pneumática cobertas por diâmetro',
      tldr: 'Categoria com 24 modelos de dispositivos de bloqueio para válvulas gaveta, volante, globo, esfera, borboleta (wafer), cilindro de gás e válvulas pneumáticas, além de cabos de aço multiuso ajustáveis, cobrindo faixas de 1/4" até 14".',
      idealFor:
        'isolar válvulas em linhas de processo industrial, gás, ar comprimido e sistemas hidráulicos, com cobertura de uma faixa ampla de diâmetro.',
      notFor: 'bloqueio de disjuntores, tomadas ou botoeiras elétricas — use Bloqueios Elétricos.',
      tableHeaders: ['Tipo de válvula', 'Faixa coberta', 'Exemplos de modelo'],
      tableRows: [
        ['Gaveta, volante e globo', '1" a 13.1/2" (35 mm a 340 mm)', 'JGL300-1 a JGL300-5'],
        ['Ajustável (gaveta/volante/globo)', '1" a 6.1/2" (35 mm a 170 mm)', 'JGL301-1'],
        ['Esfera', '1/4" a 8"', 'JGL302-1 a JGL304-3'],
        ['Borboleta (wafer)', '1.1/2" a 14"', 'JGL306-1, JGL306-2'],
        ['Cilindro de gás', '1" a 2.1/2"', 'JGL310-1'],
        ['Pneumática', 'Engate Ø6,4 / 9,5 / 12,7 mm', 'JGL311-1'],
        ['Cabo de aço multiuso', 'Flexível, 1,8 a 2,4 m', 'JGL251-1 a JGL260-18'],
      ],
      faqs: [
        {
          q: 'Um dispositivo de bloqueio serve para qualquer diâmetro de válvula?',
          a: 'Não. Cada modelo cobre uma faixa específica de diâmetro, por isso é necessário medir a válvula antes da compra.',
        },
        {
          q: 'Qual a diferença entre bloqueio ajustável e bloqueio fixo?',
          a: 'A diferença é a flexibilidade: o ajustável cobre uma faixa maior de diâmetros com uma única peça, enquanto os modelos fixos são dimensionados para uma faixa mais estreita.',
        },
        {
          q: 'O bloqueio com cabo de aço serve para qualquer tipo de válvula?',
          a: 'Sim. Por ser flexível, se adapta a válvulas, painéis e pontos de geometria irregular onde dispositivos rígidos não encaixam.',
        },
      ],
      tip: 'O erro mais comum é comprar o dispositivo pelo nome do tipo de válvula (esfera, gaveta, borboleta) sem checar a faixa de diâmetro em mm ou polegadas — o mesmo tipo em diâmetros diferentes pode exigir modelos distintos.',
      related: [
        { label: 'Bloqueio JGL251-1', href: '/produto/JGL251-1' },
        { label: 'Bloqueios Elétricos', href: '/produtos/bloqueios-eletricos' },
      ],
    },
  },

  '/produtos/caixas-e-estacoes': {
    title: 'Caixa e Estação de Bloqueio para Cadeados LOTO | JG2',
    description:
      'Caixas de bloqueio em grupo e estações de parede em aço para organizar cadeados e dispositivos LOTO em programas industriais. Solicite seu orçamento.',
    support: {
      heading: 'Caixa e Estação de Bloqueio: centralizando o controle de energias perigosas',
      tldr: 'Categoria com caixas de bloqueio em grupo (8 a 26 furos, incluindo modelo com acesso independente para PET conforme NR-33), estações de parede para até 24 cadeados, estações com prateleiras e quadros para organização de dispositivos e procedimentos LOTO.',
      idealFor:
        'bloqueios coletivos com várias fontes de energia e vários trabalhadores; centralização do estoque de cadeados e dispositivos da planta; conformidade com NR-33 em procedimentos com PET.',
      notFor: 'bloqueio individual simples de um único ponto — nesse caso, um Cadeado de Bloqueio avulso é suficiente.',
      tableHeaders: ['Tipo', 'Capacidade / dimensão', 'Uso principal'],
      tableRows: [
        ['Caixa de bloqueio em grupo', '8 a 26 furos', 'Centralizar chaves de bloqueios coletivos'],
        ['Caixa com acesso independente (NR-33)', '19 furos', 'Procedimentos com PET'],
        ['Estação de parede', '24 cadeados, 405x80 mm', 'Armazenamento organizado de cadeados'],
        ['Estação com prateleiras (G/XG)', '600x480x180 mm / 1000x690x200 mm', 'Estoque amplo de dispositivos LOTO'],
        ['Quadro para dispositivos e procedimentos', '2000x1000 mm', 'Exibição de matrizes no chão de fábrica'],
      ],
      faqs: [
        {
          q: 'A caixa de bloqueio em grupo substitui o cadeado individual?',
          a: 'Não. A caixa centraliza as chaves dos dispositivos já bloqueados, mas cada trabalhador continua aplicando seu próprio cadeado pessoal sobre a caixa.',
        },
        {
          q: 'Qual a diferença entre caixa de bloqueio e estação de bloqueio?',
          a: 'A diferença é a função: a caixa isola as chaves de um bloqueio coletivo específico em andamento, enquanto a estação de parede armazena e organiza o estoque geral da planta.',
        },
        {
          q: 'Existe caixa de bloqueio adequada à NR-33?',
          a: 'Sim. A JG2® fabrica modelo com acesso independente para PET (Permissão de Entrada e Trabalho), em linha com a NR-33.',
        },
      ],
      tip: 'O erro mais comum ao dimensionar a caixa é contar apenas os pontos mecânicos do equipamento e esquecer os pontos elétricos associados, resultando em furos insuficientes no bloqueio real.',
      related: [
        { label: 'Etiquetas e Placas', href: '/produtos/etiquetas-e-placas' },
        { label: 'Cadeados de Bloqueio', href: '/produtos/cadeados-de-bloqueio' },
      ],
    },
  },

  '/produtos/etiquetas-e-placas': {
    title: 'Etiqueta de Bloqueio LOTO, Modelo Não Opere PVC | JG2',
    description:
      'Etiquetas de bloqueio em PVC flexível, modelo padrão, personalizado e autolaminável com foto, para sinalizar pontos de isolamento. Solicite seu orçamento.',
    support: {
      heading: 'Etiqueta de Bloqueio: identificação visual que sustenta a rastreabilidade do LOTO',
      tldr: 'Categoria com etiquetas de bloqueio em PVC flexível — modelo padrão "Não Opere", versão personalizada sob demanda e versão autolaminável "Não Ligue" com espaço para foto do responsável.',
      idealFor:
        'sinalizar visualmente pontos bloqueados; identificar o responsável pelo bloqueio (versão com foto); reforçar rastreabilidade em programas LOTOTO estruturados.',
      notFor:
        'funcionar como único mecanismo de bloqueio — a etiqueta complementa, mas não substitui, o travamento físico de um Cadeado de Bloqueio.',
      tableHeaders: ['Modelo', 'Característica', 'Indicação'],
      tableRows: [
        ['JGL600-2', '"Não Opere", 140x75 mm, PVC flexível', 'Sinalização padrão de bloqueio'],
        ['JGL600-9', 'Personalizada sob demanda', 'Identificação com padrão da empresa'],
        ['JGL601-1', 'Autolaminável "Não Ligue", com foto', 'Identificação do responsável'],
      ],
      faqs: [
        {
          q: 'A etiqueta sozinha bloqueia o equipamento?',
          a: 'Não. A etiqueta tem função de aviso e identificação; o travamento físico depende do cadeado ou dispositivo de bloqueio aplicado junto.',
        },
        {
          q: 'Qual a diferença entre a etiqueta padrão e a autolaminável com foto?',
          a: 'A diferença é o nível de identificação: a padrão comunica o aviso "Não Opere", enquanto a autolaminável com foto identifica visualmente o responsável, reforçando a rastreabilidade.',
        },
        {
          q: 'É possível personalizar a etiqueta com a marca da empresa?',
          a: 'Sim. O modelo JGL600-9 é fabricado sob demanda com identificação visual personalizada.',
        },
      ],
      tip: 'O erro mais comum é reutilizar a mesma etiqueta em vários procedimentos sem preencher os campos de responsável e data a cada novo bloqueio, esvaziando a função de rastreabilidade da etiqueta.',
      related: [
        { label: 'Malas e Bolsas', href: '/produtos/malas-e-bolsas' },
        { label: 'Caixas e Estações', href: '/produtos/caixas-e-estacoes' },
      ],
    },
  },

  '/produtos/malas-e-bolsas': {
    title: 'Mala de Bloqueio para Transporte de Kit LOTO® | JG2',
    description:
      'Mala de bloqueio JG2 para transporte de equipamentos e dispositivos LOTO, prática para levar o kit completo a campo. Solicite seu orçamento agora mesmo.',
    support: {
      heading: 'Mala de Bloqueio: transporte organizado do kit LOTO entre pontos da planta',
      tldr: 'Categoria dedicada à mala de bloqueio JG2® para transporte de equipamentos e dispositivos LOTO, pensada para equipes que se deslocam entre áreas ou unidades da planta e precisam levar o kit completo de forma organizada.',
      idealFor:
        'equipes de manutenção volante que atendem múltiplos pontos no mesmo turno; padronização do kit levado a campo.',
      notFor: 'armazenamento fixo de estoque na planta — para isso, use Caixas e Estações.',
      tableHeaders: ['Item', 'Categoria relacionada'],
      tableRows: [
        ['Cadeados de bloqueio', 'Cadeados de Bloqueio'],
        ['Garras multiplicadoras', 'Garras de Bloqueio'],
        ['Etiquetas de identificação', 'Etiquetas e Placas'],
        ['Dispositivos de bloqueio diversos', 'Bloqueios Elétricos / Bloqueio de Válvulas'],
      ],
      faqs: [
        {
          q: 'A mala já vem com os dispositivos de bloqueio dentro?',
          a: 'Não. A mala é comercializada separadamente; o kit de dispositivos é montado conforme a necessidade da equipe.',
        },
        {
          q: 'A mala protege os dispositivos durante o transporte?',
          a: 'Sim. Sua estrutura foi projetada para acomodar e proteger cadeados e dispositivos LOTO durante deslocamentos na planta.',
        },
        {
          q: 'Uma mesma mala pode ser usada por equipes de turnos diferentes?',
          a: 'Sim. Por ser portátil, pode ser compartilhada entre turnos, desde que o conteúdo seja conferido na troca.',
        },
      ],
      tip: 'O erro mais comum é não fazer um checklist do conteúdo da mala antes e depois de cada uso, deixando um cadeado ou etiqueta esquecido no último ponto de bloqueio.',
      related: [
        { label: 'Dispositivos Mãos Seguras', href: '/produtos/maos-seguras' },
        { label: 'Etiquetas e Placas', href: '/produtos/etiquetas-e-placas' },
      ],
    },
  },

  '/produto/JGL050-1': {
    title: 'Cadeado de Bloqueio com Haste Cromada de 38mm | JG2',
    description:
      'Cadeado de bloqueio LOTO com haste em aço cromado de 38mm, sistema de 6 pinos e retenção de chave, disponível em várias cores. Solicite seu orçamento.',
    support: {
      heading: 'Cadeado de Bloqueio JGL050-1: haste em aço cromado 38mm com retenção de chave',
      tldr: 'Cadeado de bloqueio LOTO com haste em aço cromado Ø6,3mm x 38mm, corpo não condutivo em plástico, sistema de 6 pinos com 220.000 combinações de segredo e retenção de chave que impede retirá-la com o cadeado aberto.',
      idealFor:
        'bloqueio individual em uso geral industrial, com boa resistência mecânica; disponível em segredos diferentes, iguais ou chave mestra.',
      notFor:
        'ambientes altamente corrosivos, onde a versão em aço inox (JGL053-1) é mais indicada, nem para bloqueio coletivo do mesmo ponto — nesse caso, use uma Garra de Bloqueio.',
      tableHeaders: ['Especificação', 'Valor'],
      tableRows: [
        ['Marca', 'JG2®'],
        ['SKU', 'JGL050-1'],
        ['NCM', '8301.10.00'],
        ['Material da haste', 'Aço cromado'],
        ['Dimensão', 'Ø6,3 mm x 38 mm'],
        ['Sistema de segredo', '6 pinos, 220.000 combinações'],
      ],
      faqs: [
        {
          q: 'O cadeado JGL050-1 pode ser personalizado com numeração ou logotipo?',
          a: 'Sim. A peça permite personalização direta, como numeração, logotipo e identificação visual.',
        },
        {
          q: 'É possível comprar com chave mestra?',
          a: 'Sim. O modelo está disponível com chaves de segredos diferentes, iguais ou com chave mestra, conforme a política de controle de acesso.',
        },
        {
          q: 'O corpo plástico compromete a resistência do cadeado?',
          a: 'Não. O corpo não condutivo em plástico reduz o risco elétrico, enquanto a resistência mecânica vem da haste em aço cromado e do sistema de 6 pinos.',
        },
      ],
      tip: 'O erro mais comum é comprar o cadeado sem verificar se o programa de bloqueio da empresa exige retenção de chave. O sistema do JGL050-1 impede abrir o cadeado sem antes devolver a chave — recurso essencial em auditoria.',
      related: [
        { label: 'Cadeados de Bloqueio', href: '/produtos/cadeados-de-bloqueio' },
        { label: 'Caixas e Estações', href: '/produtos/caixas-e-estacoes' },
      ],
    },
  },

  '/produto/JGL100-1': {
    title: 'Garra de Bloqueio 25mm Plástico e Aço Cromado | JG2',
    description:
      'Multiplicador de bloqueio tipo garra, corpo plástico com haste em aço cromado de 25mm, para bloqueio coletivo em manutenções. Solicite seu orçamento.',
    support: {
      heading: 'Garra de Bloqueio JGL100-1: multiplicador tipo garra 25mm para bloqueio coletivo',
      tldr: 'Multiplicador de bloqueio tipo garra com corpo plástico e haste em aço cromado de 1" (25mm), permitindo que mais de um trabalhador aplique cadeado individual no mesmo ponto de isolamento.',
      idealFor: 'bloqueios coletivos em manutenção, inspeção e intervenção técnica com múltiplos trabalhadores.',
      notFor:
        'bloqueio de um único ponto por um único trabalhador (nesse caso, um Cadeado de Bloqueio avulso já resolve), nem para ambientes elétricos críticos, onde a versão em nylon (JGL102-1) é mais adequada.',
      tableHeaders: ['Especificação', 'Valor'],
      tableRows: [
        ['Marca', 'JG2®'],
        ['SKU', 'JGL100-1'],
        ['NCM', '7326.19.00'],
        ['Material', 'Corpo plástico, haste em aço cromado'],
        ['Altura', '115 mm'],
        ['Largura', '45 mm'],
      ],
      faqs: [
        {
          q: 'A garra JGL100-1 substitui o cadeado individual?',
          a: 'Não. Ela multiplica o ponto de bloqueio, mas cada trabalhador continua aplicando seu próprio cadeado em um dos furos disponíveis.',
        },
        {
          q: 'Esse modelo é indicado para ambientes elétricos críticos?',
          a: 'Não diretamente. O corpo é em plástico, mas a haste é em aço cromado; para aplicações elétricas de maior risco, o modelo não condutivo em nylon (JGL102-1) é o mais indicado.',
        },
        {
          q: 'É possível integrar essa garra com os cadeados já usados na planta?',
          a: 'Sim. O produto foi desenvolvido para integração direta com cadeados e dispositivos já utilizados em programas LOTO.',
        },
      ],
      tip: 'O erro mais comum é usar a garra de abertura 25mm em pontos que exigem abertura maior (38mm), forçando o encaixe e comprometendo a segurança do bloqueio — a medida do ponto deve ser conferida antes da compra.',
      related: [
        { label: 'Garras de Bloqueio', href: '/produtos/garras-de-bloqueio' },
        { label: 'Cadeados de Bloqueio', href: '/produtos/cadeados-de-bloqueio' },
      ],
    },
  },

  '/produto/JGL150-1': {
    title: 'Bloqueio Universal para Disjuntor, Norma DIN LOTO | JG2',
    description:
      'Dispositivo de bloqueio universal JG2 para disjuntores norma DIN, indicado para procedimentos LOTO em painéis e quadros elétricos. Solicite seu orçamento.',
    support: {
      heading: 'Bloqueio JGL150-1: dispositivo universal para disjuntor norma DIN',
      tldr: 'Dispositivo de bloqueio universal JG2® para disjuntores padrão DIN, em plástico ABS e nylon rígido com parafuso em aço, indicado para impedir acionamentos ou religamentos indevidos durante manutenção elétrica.',
      idealFor:
        'intervenções em painéis, quadros e sistemas elétricos com disjuntor padrão DIN, em uso combinado com cadeados e acessórios LOTO.',
      notFor:
        'disjuntores padrão NEMA/caixa moldada (nesse caso, ver os modelos JGL151), nem para bloqueio de válvulas ou pontos mecânicos.',
      tableHeaders: ['Especificação', 'Valor'],
      tableRows: [
        ['Marca', 'JG2®'],
        ['SKU', 'JGL150-1'],
        ['NCM', '3926.90.90'],
        ['Material', 'Plástico ABS e nylon rígido, parafuso em aço'],
        ['Altura', '50 mm'],
        ['Largura', '28 mm'],
      ],
      faqs: [
        {
          q: 'O JGL150-1 serve para qualquer disjuntor DIN?',
          a: 'Sim. É uma solução de bloqueio universal para diferentes configurações compatíveis com o padrão DIN.',
        },
        {
          q: 'Esse dispositivo substitui o desligamento do disjuntor?',
          a: 'Não. Ele impede o religamento físico após o disjuntor ser desligado, complementando a desenergização correta do circuito.',
        },
        {
          q: 'É necessário cadeado adicional para usar o JGL150-1?',
          a: 'Sim. O dispositivo pode ser utilizado em conjunto com cadeados e acessórios LOTO, aplicados sobre ele para travar o ponto.',
        },
      ],
      tip: 'O erro mais comum é adquirir um dispositivo de bloqueio para disjuntor sem confirmar antes se o padrão é DIN ou NEMA/caixa moldada — as geometrias são diferentes e um modelo incompatível não encaixa fisicamente.',
      related: [
        { label: 'Bloqueios Elétricos', href: '/produtos/bloqueios-eletricos' },
        { label: 'Catálogo de produtos', href: '/produtos' },
      ],
    },
  },

  '/produto/JGL251-1': {
    title: 'Bloqueio Multiuso com Cabo de Aço Ajustável 2,4 m | JG2',
    description:
      'Dispositivo de bloqueio multiuso JG2 com cabo de aço ajustável de 2,4m e 1 furo para cadeado, flexível para válvulas e painéis. Solicite seu orçamento.',
    support: {
      heading: 'Bloqueio JGL251-1: dispositivo multiuso com cabo de aço ajustável 2,4m',
      tldr: 'Dispositivo de bloqueio multiuso JG2® com corpo em plástico ABS, 1 furo para cadeado e cabo de aço ajustável de Ø3,3mm x 2,4m revestido em nylon, indicado para bloqueio flexível de válvulas, painéis e outros pontos compatíveis.',
      idealFor:
        'pontos de isolamento com geometria irregular, onde dispositivos rígidos não encaixam; bloqueio individual flexível em válvulas, painéis, chaves e alavancas.',
      notFor:
        'bloqueio coletivo por vários trabalhadores no mesmo ponto (nesse caso, ver as Garras de Bloqueio) nem como substituto de um cadeado propriamente dito — este produto é um dispositivo auxiliar de bloqueio, não um cadeado.',
      tableHeaders: ['Especificação', 'Valor'],
      tableRows: [
        ['Marca', 'JG2®'],
        ['SKU', 'JGL251-1'],
        ['NCM', '3926.90.90'],
        ['Material', 'Corpo em plástico ABS, cabo de aço revestido em nylon'],
        ['Comprimento do cabo', '2,4 m'],
        ['Furos para cadeado', '1'],
      ],
      faqs: [
        {
          q: 'O JGL251-1 é um cadeado?',
          a: 'Não. É um dispositivo de bloqueio multiuso com cabo de aço, com 1 furo para receber um cadeado à parte — o travamento final depende de um cadeado aplicado em conjunto.',
        },
        {
          q: 'O cabo de aço serve para qualquer diâmetro de válvula ou painel?',
          a: 'Sim. Por ser flexível, o cabo se adapta a diferentes formatos e diâmetros, ao contrário de dispositivos rígidos dimensionados por faixa fixa.',
        },
        {
          q: 'É possível usar esse modelo para bloqueio coletivo?',
          a: 'Não diretamente. Este modelo tem apenas 1 furo para cadeado; para bloqueio coletivo, o indicado é o modelo com 6 furos (JGL254-1 ou JGL256-1) ou uma garra de bloqueio.',
        },
      ],
      tip: 'O erro mais comum é comprar o JGL251-1 pensando que ele já substitui o cadeado. Na prática, o dispositivo cria o ponto de fixação do cabo, mas o travamento efetivo do procedimento só se completa com um cadeado aplicado no furo.',
      related: [
        { label: 'Bloqueio de Válvulas', href: '/produtos/bloqueio-de-valvulas' },
        { label: 'Caixas e Estações', href: '/produtos/caixas-e-estacoes' },
      ],
    },
  },
};
