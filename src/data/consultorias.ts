/**
 * Conteúdo institucional das 3 páginas de consultoria — texto real extraído
 * do protótipo de referência (Site JG2.dc.html, função consultorias()).
 * Estático de propósito: não há necessidade de um modelo no banco pra
 * conteúdo de marketing fixo como este.
 */

export type ConsultoriaStep = { n: string; title: string; body: string };
export type ConsultoriaShowcaseItem = { title: string; desc: string; img: string; fit: 'cover' | 'contain' };
export type ConsultoriaDiff = { title: string; body: string };
export type ConsultoriaFaq = { q: string; a: string };

export type ConsultoriaData = {
  slug: 'lototo' | 'nr12' | 'maos-seguras';
  pill: string;
  heroImg: string;
  heroH1: string;
  heroBtn: string;
  subtitle: string;
  problemTitle: string;
  problemParas: string[];
  problemImg: string;
  problemFit: 'cover' | 'contain';
  gainsTitle: string;
  gains: string[];
  stagesTitle: string;
  stages: string[];
  howTitle: string;
  steps: ConsultoriaStep[];
  showcaseTitle: string;
  showcaseText: string;
  showcase: ConsultoriaShowcaseItem[];
  normsTitle: string;
  norms: string[];
  diffTitle: string;
  diffs: ConsultoriaDiff[];
  software?: { title: string; text: string; cta: string; img: string };
  ctaTitle: string;
  ctaText: string;
  faqs: ConsultoriaFaq[];
};

export const consultorias: Record<ConsultoriaData['slug'], ConsultoriaData> = {
  lototo: {
    slug: 'lototo',
    pill: 'Consultoria LOTOTO',
    heroImg: '/uploads/loto/banner.png',
    heroH1: 'JG2® Programa LOTOTO completo para quem não aceita improviso em segurança',
    heroBtn: 'Conhecer consultoria LOTOTO →',
    subtitle:
      'Com a JG2, você conduz a adequação LOTOTO do início ao fim — com levantamento técnico, matrizes de bloqueio, definição e fornecimento de dispositivos, treinamento, auditorias, gestão de mudanças e software para gestão contínua.',
    problemTitle: 'Por que muitos programas LOTO falham mesmo depois da implantação',
    problemImg: '/uploads/loto/fluxo-implantacao.png',
    problemFit: 'contain',
    problemParas: [
      'Muitas empresas iniciam o programa, mas param no meio do caminho ou implantam apenas partes isoladas da solução. O resultado costuma ser o mesmo: matrizes incompletas, dispositivos mal definidos, equipe sem treinamento suficiente, falhas na verificação de energia zero e perda de consistência com o tempo.',
      'Com a JG2, sua empresa evita esse cenário porque estrutura o controle de energias perigosas como um sistema completo, e não como uma ação pontual.',
    ],
    gainsTitle: 'O que sua empresa ganha com a adequação LOTOTO da JG2',
    gains: [
      'Mais segurança nas intervenções em máquinas e equipamentos',
      'Mais clareza sobre riscos, prioridades e ações corretivas',
      'Mais padronização no bloqueio e etiquetagem',
      'Mais aderência às normas nacionais e internacionais',
      'Menos improviso, menos falhas e menos exposição a acidentes',
      'Mais controle sobre treinamentos, revisões e mudanças da operação',
    ],
    stagesTitle: 'Uma empresa só para todas as etapas do seu programa LOTOTO',
    stages: [
      'Levantamento técnico',
      'Matrizes de bloqueio',
      'Lista detalhada de dispositivos',
      'Fornecimento dos dispositivos',
      'Treinamento e capacitação',
      'Auditorias e gestão de mudanças',
      'Software JG2 Smart Loto®',
    ],
    howTitle: 'Como a JG2 conduz a adequação LOTOTO da sua operação',
    steps: [
      { n: '01', title: 'Gemba Day — levantamento técnico', body: 'Mapeamos as fontes de energia perigosa de cada equipamento, avaliamos os procedimentos existentes e identificamos lacunas. Você recebe um documento técnico completo com a leitura real da planta e um plano de ação estruturado.' },
      { n: '02', title: 'Matrizes de bloqueio', body: 'Elaboramos matrizes personalizadas com layout claro: identificação do equipamento, sequência de bloqueio e desbloqueio, pontos, dispositivos aplicáveis e verificação de energia zero — em texto e imagem.' },
      { n: '03', title: 'Lista detalhada de bloqueio', body: 'Você recebe uma lista técnica detalhada com os modelos corretos de dispositivos e os quantitativos ideais por turno. Compra certo, evita excesso ou falta e garante coerência entre projeto e execução.' },
      { n: '04', title: 'Fornecimento dos dispositivos', body: 'Fabricamos e distribuímos os dispositivos de bloqueio e etiquetagem LOTO JG2®, com mais agilidade na compra, coerência técnica e suporte no dia a dia do programa.' },
      { n: '05', title: 'Treinamento e capacitação', body: 'Treinamentos práticos e personalizados, ajustados aos seus procedimentos e ao nível de maturidade da operação. Sua equipe desenvolve comportamento seguro e confiança na execução.' },
      { n: '06', title: 'Auditorias e gestão de mudanças', body: 'Auditorias periódicas para verificar a eficácia do programa, medir maturidade e identificar ajustes. Seu programa se mantém vivo e aderente à realidade da planta.' },
      { n: '07', title: 'Software JG2 Smart Loto®', body: 'Gere novas matrizes, audite bloqueios em tempo real, acompanhe indicadores por dashboards, emita relatórios e gerencie estoque LOTO. O LOTOTO vira um sistema vivo de gestão.' },
    ],
    showcaseTitle: 'O que sua empresa recebe na prática',
    showcaseText: 'Documentos técnicos, dispositivos e gestão — entregáveis reais que sustentam o programa no campo.',
    showcase: [
      { title: 'Levantamento técnico em campo', desc: 'Mapeamento completo das fontes de energia perigosa, pontos de isolamento e condições reais de cada equipamento da planta.', img: '/uploads/loto/levantamento.png', fit: 'cover' },
      { title: 'Matrizes de bloqueio personalizadas', desc: 'Instrução visual de bloqueio de energia perigosa por equipamento — sequência, pontos, dispositivos e verificação de energia zero.', img: '/uploads/loto/matriz.png', fit: 'cover' },
      { title: 'Lista detalhada de dispositivos', desc: 'Relação técnica com modelos corretos e quantitativos ideais por turno, construída a partir dos pontos de isolamento mapeados.', img: '/uploads/loto/lista-dispositivos.png', fit: 'cover' },
      { title: 'Dispositivos de bloqueio JG2®', desc: 'Cadeados, garras, bloqueios de válvula, etiquetas e caixas de bloqueio fabricados pela JG2 — alinhados ao projeto.', img: '/uploads/loto/produtos-loto.png', fit: 'contain' },
      { title: 'Treinamento em Bloqueio, Etiquetagem e Teste (LOTOTO)', desc: 'Capacitação ampla das equipes sobre o programa de controle de energias perigosas, adequado às regras e procedimentos já existentes na empresa.', img: '/uploads/loto/treinamento.jpg', fit: 'cover' },
      { title: 'Auditoria periódica do programa', desc: 'Verificação em campo da aplicação dos bloqueios, conformidade dos procedimentos e gestão de mudanças para manter o programa vivo e confiável.', img: '/uploads/loto/auditoria-loto.png', fit: 'cover' },
    ],
    normsTitle: 'Base técnica para um programa LOTO robusto',
    norms: ['NR-10', 'NR-12', 'NR-33', 'OSHA 29 CFR 1910.147', 'ANSI/ASSP Z244.1'],
    diffTitle: 'Por que a JG2 entrega mais segurança para o seu programa LOTO',
    diffs: [
      { title: 'Visão completa da implantação', body: 'Uma empresa integra todas as etapas — mapear, fornecer, treinar e auditar — para reduzir falhas e retrabalho.' },
      { title: 'Aderente à realidade da planta', body: 'Cada decisão é construída com base na operação, nos equipamentos, nas equipes e nos riscos reais da planta.' },
      { title: 'Suporte antes, durante e depois', body: 'Acompanhamos sua operação com proximidade, velocidade e entendimento técnico.' },
      { title: 'Gestão contínua e maturidade', body: 'O programa evolui com auditorias, revisões, gestão de mudanças e software.' },
    ],
    software: {
      title: 'Gestão contínua com o JG2 Smart Loto®',
      text: 'A implantação é só o começo. Com o software você gera novas matrizes, audita bloqueios em tempo real, acompanha indicadores por dashboards, emite relatórios, planeja atividades e gerencia o estoque LOTO — transformando o programa em um sistema vivo de gestão, com rastreabilidade e governança.',
      cta: 'Conhecer o Smart Loto®',
      img: '/uploads/loto/smart-loto-logo.jpg',
    },
    ctaTitle: 'Estruture um programa LOTOTO que funcione de verdade',
    ctaText: 'Se sua empresa precisa avançar com mais segurança, mais clareza técnica e menos improviso, a JG2 apoia sua operação do início ao fim.',
    faqs: [
      { q: 'A JG2 faz apenas consultoria ou também entrega a implantação completa?', a: 'Entregamos a implantação completa: Gemba Walk, matrizes de bloqueio, lista detalhada de dispositivos, fornecimento, treinamento, auditorias, gestão de mudanças e software de gestão contínua.' },
      { q: 'Já temos um programa LOTO. A JG2 consegue revisar e evoluir o que já existe?', a: 'Sim. Atuamos na revisão de programas implantados, identificando gaps, atualizando matrizes, revisando procedimentos e reorganizando o programa para que volte a funcionar com eficácia.' },
      { q: 'Por que não basta comprar os dispositivos de bloqueio?', a: 'Porque o dispositivo sem levantamento técnico, matriz, procedimento, treinamento e auditoria não sustenta um programa robusto. O LOTO precisa estar alinhado à realidade da planta.' },
      { q: 'O software substitui a implantação do programa?', a: 'Não. O JG2 Smart Loto complementa e fortalece a gestão contínua — mantém matrizes atualizadas, audita bloqueios, acompanha atividades e controla estoque.' },
    ],
  },

  nr12: {
    slug: 'nr12',
    pill: 'Consultoria NR-12',
    heroImg: '/uploads/nr12/banner.jpg',
    heroH1: 'Adequação NR-12 completa para sua operação avançar sem retrabalho',
    heroBtn: 'Conhecer consultoria NR-12 →',
    subtitle: 'Do inventário ao laudo de conformidade: análise, projeto, fabricação, instalação, documentação e capacitação em um só parceiro.',
    problemTitle: 'Quando a adequação NR-12 é feita por partes desconexas, o custo aparece depois',
    problemImg: '/uploads/nr12/fabricacao.jpg',
    problemFit: 'cover',
    problemParas: [
      'Muitas empresas contratam uma etapa com um fornecedor, outra com outro, e enfrentam o mesmo problema: documentação que não conversa com a execução, proteções mal definidas, necessidade de refazer estudos, atraso no cronograma e investimento maior do que o previsto.',
      'Com a JG2, sua empresa conta com uma equipe que executa todas as etapas da adequação NR-12, com visão completa da máquina, da operação e do resultado final.',
    ],
    gainsTitle: 'O que sua empresa ganha com a JG2',
    gains: [
      'Mais segurança para adequar com critério técnico',
      'Mais clareza para priorizar máquinas e investimentos',
      'Menos retrabalho entre análise, projeto e instalação',
      'Mais confiança para apresentar o plano à diretoria',
      'Mais consistência entre documentação e realidade de campo',
      'Mais previsibilidade para evoluir a adequação por fases',
    ],
    stagesTitle: 'Uma empresa só. Todas as etapas da sua adequação NR-12.',
    stages: [
      'Inventário de máquinas',
      'Apreciação de riscos',
      'Projetos conceituais e detalhados',
      'Fabricação e instalação das proteções',
      'Laudo de conformidade NR-12',
      'Elaboração de manuais',
      'Treinamento e capacitação',
      'Auditorias e gestão de mudanças',
    ],
    howTitle: 'Como a JG2 conduz sua adequação NR-12',
    steps: [
      { n: '01', title: 'Inventário de máquinas', body: 'Levantamento detalhado do parque fabril em planilha e documento técnico, criando a base que sustenta todas as etapas seguintes. Você ganha controle sobre o escopo e melhora o planejamento.' },
      { n: '02', title: 'Apreciação de riscos', body: 'Conduzida com base na NR-12, ABNT NBR ISO 12100, ISO 13849, NBR 14153 e demais referências. Identificamos perigos, estimamos riscos, definimos prioridades e indicamos medidas de redução.' },
      { n: '03', title: 'Projetos conceituais e detalhados', body: 'Você visualiza a solução antes da execução e discute com operação, manutenção e engenharia. Depois da aprovação, avançamos para os projetos mecânicos, elétricos, pneumáticos e hidráulicos.' },
      { n: '04', title: 'Fabricação e instalação das proteções', body: 'Fabricamos e instalamos as proteções com materiais compatíveis — aço inox ou aço galvanizado com pintura eletrostática. Sem amarração a uma única marca: a proteção certa para o risco certo.' },
      { n: '05', title: 'Laudo de conformidade NR-12', body: 'Laudo final sustentado por nova apreciação de riscos e validação técnica da condição final da máquina. Você ganha respaldo técnico e confiança diante de auditorias.' },
      { n: '06', title: 'Elaboração de manuais', body: 'Elaboramos os novos manuais de utilização conforme exigência normativa, organizando orientações para uso, operação, intervenção e cuidados com o equipamento.' },
      { n: '07', title: 'Treinamento e capacitação', body: 'Treinamentos práticos para as equipes que interagem com os equipamentos e para os gestores do programa. Seu time entende o que mudou e como preservar o desempenho seguro.' },
      { n: '08', title: 'Auditorias e gestão de mudanças', body: 'Avaliamos a condição atual das máquinas, revisamos adequações, identificamos novos gaps e verificamos necessidade de atualização. A adequação não perde eficácia com o tempo.' },
    ],
    showcaseTitle: 'Como a JG2 conduz sua adequação NR-12',
    showcaseText: 'Cada etapa é planejada para gerar avanço real, não retrabalho futuro — da análise do parque fabril ao acompanhamento contínuo.',
    showcase: [
      { title: 'Inventário de máquinas', desc: 'Levantamento detalhado do parque fabril em planilha e documento técnico — um retrato confiável do que precisa ser avaliado, adequado e priorizado.', img: '/uploads/nr12/inventario.png', fit: 'contain' },
      { title: 'Apreciação de riscos', desc: 'Conduzida com base na NR-12, ISO 12100, ISO 13849 e NBR 14153: identifica perigos, estima riscos e indica as medidas de redução adequadas à sua operação.', img: '/uploads/nr12/apreciacao.png', fit: 'contain' },
      { title: 'Projetos conceituais e detalhados', desc: 'Você visualiza a solução antes de investir e aprova o que faz sentido. Depois avançamos para os projetos mecânicos, elétricos, pneumáticos e hidráulicos.', img: '/uploads/nr12/projeto.png', fit: 'contain' },
      { title: 'Fabricação e instalação das proteções', desc: 'Fabricamos e instalamos as proteções com materiais compatíveis — aço inox ou galvanizado com pintura eletrostática. A proteção certa para o risco certo.', img: '/uploads/nr12/fabricacao.jpg', fit: 'cover' },
      { title: 'Laudo de conformidade NR-12', desc: 'Laudo final sustentado por nova apreciação de riscos e validação técnica da condição final da máquina — respaldo técnico e segurança diante de auditorias.', img: '/uploads/nr12/laudo.png', fit: 'contain' },
      { title: 'Elaboração de manuais', desc: 'Novos manuais de utilização conforme exigência normativa, com orientações para uso, operação, intervenção e cuidados com o equipamento adequado.', img: '/uploads/nr12/adequacao.png', fit: 'contain' },
      { title: 'Treinamento e capacitação de equipes', desc: 'Treinamentos práticos e direcionados à sua operação: seu time entende o que mudou, por quê, e como preservar o desempenho seguro da máquina.', img: '/uploads/nr12/treinamento.png', fit: 'cover' },
      { title: 'Auditorias periódicas e gestão de mudanças', desc: 'Revisamos adequações implantadas, identificamos novos gaps e mantemos a adequação alinhada à realidade da planta à medida que a operação evolui.', img: '/uploads/nr12/auditoria.png', fit: 'cover' },
    ],
    normsTitle: 'Normas que embasam a adequação',
    norms: ['NR-12', 'ABNT NBR ISO 12100', 'ABNT NBR ISO 13849', 'NBR 14153'],
    diffTitle: 'Por que adequar com a JG2',
    diffs: [
      { title: 'Visão completa do projeto', body: 'Análise, projeto, fabricação, instalação, laudo, manuais e treinamento em uma só estrutura — menos ruído entre etapas.' },
      { title: 'Adequação faseada sob controle', body: 'Priorize máquinas críticas, justifique investimentos e avance sem perder a lógica técnica do projeto.' },
      { title: 'Sem exclusividade de marca', body: 'Os dispositivos são definidos pela exigência técnica e necessidade real da planta. Você investe no que faz sentido.' },
      { title: 'Respaldo técnico e jurídico', body: 'Laudo de conformidade com nova apreciação de riscos e validação da condição final da máquina.' },
    ],
    ctaTitle: 'Sua adequação NR-12 conduzida com visão completa',
    ctaText: 'Converse com a JG2 e entenda como estruturar a adequação de forma faseada, sem perder a consistência do projeto.',
    faqs: [
      { q: 'A JG2 faz apenas a documentação ou executa a adequação completa?', a: 'Executamos a adequação de ponta a ponta: inventário, apreciação de riscos, projetos, fabricação, instalação, laudo de conformidade, manuais, treinamento e auditorias.' },
      { q: 'Já tenho parte da adequação feita. A JG2 assume a continuidade?', a: 'Sim. Revisamos o que foi feito, identificamos lacunas e reorganizamos o projeto em uma linha técnica mais segura, coerente e confiável.' },
      { q: 'É possível adequar por etapas?', a: 'Sim. Estruturamos a adequação de forma faseada para priorizar máquinas críticas, justificar investimentos e avançar sem perder a lógica técnica.' },
      { q: 'A JG2 entrega laudo de conformidade?', a: 'Sim. Após a execução das adequações realizamos o laudo final de conformidade NR-12, com nova apreciação de riscos e validação técnica.' },
    ],
  },

  'maos-seguras': {
    slug: 'maos-seguras',
    pill: 'Consultoria Mãos Seguras',
    heroImg: '/uploads/maoscons/banner.png',
    heroH1: 'JG2® — Mãos Seguras para quem precisa reduzir risco sem depender de improviso operacional',
    heroBtn: 'Conhecer consultoria Mãos Seguras →',
    subtitle: 'Engenharia aplicada à atividade real: atendimento, levantamento, projeto, fabricação e acompanhamento contínuo.',
    problemTitle: 'Por que tantas operações continuam expostas a acidentes com as mãos',
    problemImg: '/uploads/maoscons/atendimento.jpg',
    problemFit: 'cover',
    problemParas: [
      'Em muitas plantas o risco é conhecido, mas a solução não é tratada da forma certa. A empresa continua dependendo de hábito, atenção individual ou ferramenta inadequada para tarefas que deixam as mãos próximas da zona de perigo — o que aparece em forma de cortes, esmagamentos, perfurações e mutilações.',
      'Com a JG2, sua empresa trata isso da forma correta: com engenharia aplicada à operação, não com improviso.',
    ],
    gainsTitle: 'O que sua empresa ganha com a consultoria em Mãos Seguras',
    gains: [
      'Mais segurança nas atividades com risco de contato manual',
      'Mais padronização na execução operacional',
      'Menos improviso no dia a dia da planta',
      'Mais aderência às exigências de segurança e ergonomia',
      'Menos exposição a acidentes com as mãos',
      'Mais durabilidade e consistência nas soluções aplicadas',
    ],
    stagesTitle: 'Uma empresa só. Todas as etapas da sua solução.',
    stages: [
      'Atendimento especializado',
      'Levantamento de atividades',
      'Projetos conceituais e detalhados',
      'Fabricação de dispositivos personalizados',
      'Fornecimento de dispositivos',
      'Auditorias e gestão de mudanças',
    ],
    howTitle: 'Como a JG2 conduz a consultoria em Mãos Seguras',
    steps: [
      { n: '01', title: 'Atendimento especializado', body: 'Entendemos seu cenário com critério técnico: tipo de atividade, risco envolvido, limitações operacionais e objetivo da solução. Você começa com atendimento técnico, não com tentativa e erro.' },
      { n: '02', title: 'Levantamento de atividades', body: 'Observamos como a tarefa acontece na prática, identificamos o ponto exato de exposição e entendemos os movimentos, alcances e rotinas que precisam ser tratados.' },
      { n: '03', title: 'Projetos conceituais e detalhados', body: 'Você visualiza a proposta e valida a aplicação antes de fabricar. Depois da validação conceitual, avançamos para o detalhamento técnico — reduzindo o risco de retrabalho.' },
      { n: '04', title: 'Fabricação de dispositivos personalizados', body: 'Desenvolvemos dispositivos sob medida para a atividade, fabricados em aço galvanizado com pintura eletrostática ou aço inox, conforme a aplicação e o ambiente.' },
      { n: '05', title: 'Fornecimento de dispositivos', body: 'Realizamos o fornecimento com alinhamento entre o que foi analisado, projetado e o que será utilizado — mais velocidade, coerência técnica e menos ruído entre desenvolvimento e aplicação.' },
      { n: '06', title: 'Auditorias e gestão de mudanças', body: 'A operação muda e o risco também. Auditorias periódicas verificam se a solução continua adequada e se há necessidade de revisão, reforço ou atualização.' },
    ],
    showcaseTitle: 'Como a JG2 conduz a consultoria em Mãos Seguras',
    showcaseText: 'Da análise da atividade em campo ao acompanhamento contínuo — cada etapa desenvolve uma solução aderente à sua operação real.',
    showcase: [
      { title: 'Atendimento especializado', desc: 'Entendemos seu cenário com critério técnico: tipo de atividade, risco envolvido, limitações operacionais e objetivo da solução. Você começa com atendimento técnico, não com tentativa e erro.', img: '/uploads/maoscons/atendimento.jpg', fit: 'cover' },
      { title: 'Levantamento de atividades', desc: 'Observamos como a tarefa acontece na prática, identificamos o ponto exato de exposição e entendemos os movimentos, alcances e rotinas que precisam ser tratados.', img: '/uploads/maoscons/levantamento.png', fit: 'cover' },
      { title: 'Projetos conceituais e detalhados', desc: 'Você visualiza a proposta e valida a aplicação antes de fabricar. Depois da validação conceitual, avançamos para o detalhamento técnico — reduzindo o risco de retrabalho.', img: '/uploads/maoscons/projeto.png', fit: 'contain' },
      { title: 'Fabricação de dispositivos personalizados', desc: 'Desenvolvemos dispositivos sob medida para a atividade, fabricados em aço galvanizado com pintura eletrostática ou aço inox, conforme a aplicação e o ambiente.', img: '/uploads/maoscons/fabricacao.png', fit: 'contain' },
      { title: 'Fornecimento de dispositivos', desc: 'Realizamos o fornecimento com alinhamento entre o que foi analisado, projetado e o que será utilizado — mais velocidade, coerência técnica e menos ruído entre desenvolvimento e aplicação.', img: '/uploads/maoscons/catalogo.png', fit: 'cover' },
      { title: 'Auditorias e gestão de mudanças', desc: 'A operação muda e o risco também. Auditorias periódicas verificam se a solução continua adequada e se há necessidade de revisão, reforço ou atualização.', img: '/uploads/maoscons/auditoria.png', fit: 'contain' },
    ],
    normsTitle: 'Materiais de fabricação',
    norms: ['Aço galvanizado com pintura eletrostática', 'Aço inox'],
    diffTitle: 'O que diferencia a consultoria em Mãos Seguras da JG2',
    diffs: [
      { title: 'Solução pensada para a atividade real', body: 'Partimos da operação em campo, não de uma peça pronta tentando se encaixar depois.' },
      { title: 'Projeto antes da fabricação', body: 'Sua empresa valida a solução antes da execução, com mais previsibilidade e menos retrabalho.' },
      { title: 'Fabricação personalizada', body: 'Dispositivos desenvolvidos conforme a aplicação, em aço galvanizado com pintura eletrostática ou aço inox.' },
      { title: 'Continuidade da solução', body: 'Acompanhamos a evolução da operação com auditorias e gestão de mudanças.' },
    ],
    ctaTitle: 'Torne suas atividades mais seguras com soluções personalizadas',
    ctaText: 'Se a sua operação convive com tarefas que expõem as mãos ao risco, a JG2 analisa a atividade, desenvolve a solução e apoia do diagnóstico à aplicação final.',
    faqs: [
      { q: 'A JG2 vende apenas os dispositivos ou também realiza a consultoria completa?', a: 'Fazemos os dois: atendimento especializado, levantamento de atividades, desenvolvimento da solução, fabricação personalizada, fornecimento e acompanhamento contínuo.' },
      { q: 'Os dispositivos são padronizados ou personalizados?', a: 'As soluções são desenvolvidas de acordo com a atividade, o risco e a realidade operacional da planta, para reduzir a exposição das mãos com uma solução aderente à execução real.' },
      { q: 'Em quais materiais os dispositivos podem ser fabricados?', a: 'Em aço galvanizado com pintura eletrostática ou aço inox, conforme a necessidade da aplicação, do ambiente e da exigência operacional.' },
      { q: 'A solução considera apenas segurança ou também ergonomia?', a: 'Também considera ergonomia: reduzir a exposição ao risco sem comprometer a execução, buscando uma solução segura, funcional e aplicável no dia a dia.' },
    ],
  },
};
