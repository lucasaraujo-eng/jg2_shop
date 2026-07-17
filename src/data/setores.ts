/** Estático de propósito: conteúdo institucional fixo, sem necessidade de modelo no banco. */

export type SetorData = {
  id: string;
  name: string;
  lead: string;
  img: string;
  intro: [string, string];
  comoAtua: [string, string];
  riscos: [string, string, string, string];
};

export const setores: SetorData[] = [
  {
    id: 'alimentos',
    name: 'Indústria de Alimentos',
    lead: 'Linhas de envase, transporte e processamento que operam em alta cadência e exigem higiene e segurança simultâneas.',
    img: '/uploads/setores/alimentos.jpg',
    intro: [
      'A indústria de alimentos opera com linhas contínuas de processamento, envase e embalagem que combinam esteiras, dosadoras, seladoras, autoclaves e sistemas de refrigeração. A produtividade depende de equipamentos funcionando em alta cadência, muitas vezes em três turnos.',
      'É um setor que une dois desafios críticos ao mesmo tempo: garantir a inocuidade do alimento e proteger o operador. Limpezas frequentes (CIP/COP), trocas de formato e desobstruções colocam pessoas em contato direto com partes móveis e energias perigosas várias vezes ao dia.',
    ],
    comoAtua: [
      'Boa parte dos acidentes acontece justamente nas paradas para limpeza e desobstrução, quando o operador acessa roscas transportadoras, esteiras e misturadores sem o desligamento seguro da energia. A presença de água, vapor e produtos químicos de sanitização agrava o risco elétrico e de queimaduras.',
      'Equipamentos como envasadoras, encaixotadoras e paletizadoras automáticas concentram pontos de prensagem e esmagamento. Sem barreiras e procedimentos adequados, cada intervenção rápida vira uma exposição.',
    ],
    riscos: [
      'Esmagamento em esteiras, roscas e envasadoras',
      'Queimaduras por vapor, autoclaves e sistemas CIP',
      'Risco elétrico agravado por ambientes úmidos',
      'Aprisionamento em paletizadoras e encaixotadoras',
    ],
  },
  {
    id: 'papel',
    name: 'Papel e Celulose',
    lead: 'Máquinas de grande porte, bobinas pesadas e rolos em rotação que tornam o controle de energia indispensável.',
    img: '/uploads/setores/papel.jpg',
    intro: [
      'O segmento de papel e celulose opera com máquinas de grande porte — desfibradores, digestores, máquinas de papel, bobinadeiras e rebobinadeiras — que processam material continuamente sob alta tensão mecânica e temperatura.',
      'São plantas com elevada energia acumulada: rolos pesados em rotação, vapor, prensas e acionamentos de centenas de cavalos. Qualquer intervenção em manutenção exige rigor absoluto no controle dessas energias.',
    ],
    comoAtua: [
      'A operação envolve trocas de feltros, telas e rolos, limpeza de prensas e desobstrução de linhas — tarefas que aproximam o trabalhador de pontos de esmagamento e arraste. A inércia das bobinas faz com que um equipamento continue perigoso mesmo após o desligamento.',
      'O ambiente combina energia mecânica, térmica e hidráulica em um mesmo equipamento, o que exige isolamento de múltiplas fontes antes de qualquer acesso.',
    ],
    riscos: [
      'Arraste e esmagamento em rolos e prensas',
      'Energia residual em bobinas de alta inércia',
      'Queimaduras por vapor e secadores',
      'Múltiplas fontes de energia por equipamento',
    ],
  },
  {
    id: 'metalurgia',
    name: 'Metalurgia e Siderurgia',
    lead: 'Altas temperaturas, metal líquido e equipamentos de força que exigem o mais alto padrão de bloqueio.',
    img: '/uploads/setores/metalurgia.jpg',
    intro: [
      'Metalurgia e siderurgia estão entre os ambientes industriais mais severos: fornos, laminadores, lingotamento, pontes rolantes e linhas de tratamento térmico operam com metal a centenas de graus e forças mecânicas imensas.',
      'A combinação de calor, energia elétrica de alta potência e cargas suspensas faz desse setor um dos que mais dependem de procedimentos robustos de controle de energia.',
    ],
    comoAtua: [
      'As manutenções acontecem perto de equipamentos que retêm energia térmica e mecânica por longos períodos. Laminadores e tesouras concentram pontos de esmagamento e corte; pontes rolantes adicionam o risco de queda de carga.',
      'Trocas de cilindros, desobstruções e ajustes exigem que o equipamento esteja comprovadamente isolado de todas as suas fontes — elétrica, hidráulica e pneumática — antes do acesso.',
    ],
    riscos: [
      'Queimaduras graves por metal e superfícies quentes',
      'Esmagamento em laminadores e tesouras',
      'Queda de carga em pontes rolantes',
      'Alta energia elétrica e hidráulica acumulada',
    ],
  },
  {
    id: 'textil',
    name: 'Têxtil',
    lead: 'Teares, cardas e cilindros em rotação contínua com inúmeros pontos de arraste e prensagem.',
    img: '/uploads/setores/textil.jpeg',
    intro: [
      'A indústria têxtil opera com cardas, fiandeiras, teares, tinturarias e calandras — máquinas com muitos cilindros, correias e engrenagens em rotação contínua, frequentemente expostas.',
      'A alta cadência e a necessidade constante de ajuste e troca de fios aproximam o operador das partes móveis dezenas de vezes por turno.',
    ],
    comoAtua: [
      'O arraste de membros por cilindros e a prensagem em calandras estão entre os acidentes mais comuns. Limpezas e desembaraços feitos com a máquina energizada são a principal causa de lesões nas mãos.',
      'Tinturarias adicionam risco químico e térmico, exigindo isolamento de válvulas e linhas além do bloqueio elétrico.',
    ],
    riscos: [
      'Arraste de mãos em cilindros e teares',
      'Prensagem em calandras',
      'Risco químico e térmico em tinturarias',
      'Partes móveis frequentemente expostas',
    ],
  },
  {
    id: 'automotiva',
    name: 'Indústria Automotiva',
    lead: 'Linhas robotizadas, prensas e células de solda que combinam automação e intervenção humana constante.',
    img: '/uploads/setores/automotiva.jpg',
    intro: [
      'A indústria automotiva é referência em automação: prensas de estampagem, robôs de solda e montagem, transportadores aéreos e células automatizadas movem a produção em ritmo elevado.',
      'Apesar da automação, a intervenção humana é constante — ajustes de ferramental, troca de matrizes, desobstrução e manutenção preventiva colocam o trabalhador dentro de células de alta energia.',
    ],
    comoAtua: [
      'Prensas de estampagem concentram um dos maiores potenciais de amputação da indústria. Robôs e transportadores criam zonas de movimento imprevisível onde o acesso sem bloqueio é fatal.',
      'Cada troca de matriz ou intervenção em célula exige isolamento de energia elétrica, pneumática e hidráulica, além do controle dos movimentos residuais dos robôs.',
    ],
    riscos: [
      'Amputação em prensas de estampagem',
      'Impacto e prensagem por robôs e manipuladores',
      'Energia pneumática e hidráulica residual',
      'Zonas de movimento automatizado imprevisível',
    ],
  },
  {
    id: 'quimica',
    name: 'Química e Petroquímica',
    lead: 'Processos contínuos com pressão, temperatura e produtos perigosos que exigem isolamento absoluto.',
    img: '/uploads/setores/quimica.png',
    intro: [
      'Plantas químicas e petroquímicas operam processos contínuos sob pressão e temperatura, com reatores, colunas, bombas, compressores e extensas redes de tubulação conduzindo fluidos perigosos.',
      'É um setor onde a energia perigosa vai muito além da elétrica: pressão, produtos inflamáveis, tóxicos e corrosivos tornam cada intervenção uma operação de alto risco.',
    ],
    comoAtua: [
      'Manutenções em bombas, válvulas e trocadores exigem despressurização, purga e isolamento positivo das linhas antes do acesso. Uma válvula aberta por engano pode liberar produto sob pressão sobre a equipe.',
      'O bloqueio e a etiquetagem de válvulas é tão crítico quanto o bloqueio elétrico — e frequentemente envolve dezenas de pontos por intervenção.',
    ],
    riscos: [
      'Liberação de produtos sob pressão',
      'Exposição a inflamáveis, tóxicos e corrosivos',
      'Necessidade de isolamento positivo de linhas',
      'Múltiplos pontos de bloqueio por tarefa',
    ],
  },
  {
    id: 'mineracao',
    name: 'Mineração',
    lead: 'Britadores, correias transportadoras de longo curso e equipamentos pesados em ambiente severo.',
    img: '/uploads/setores/mineracao.jpg',
    intro: [
      'A mineração opera com britadores, moinhos, peneiras e quilômetros de correias transportadoras que movimentam minério em volume e velocidade elevados, muitas vezes a céu aberto e sob condições severas.',
      'São equipamentos de força bruta, com grande energia acumulada e pontos de aprisionamento ao longo de toda a planta de beneficiamento.',
    ],
    comoAtua: [
      'Desobstruções de britadores e chutes e a manutenção de correias estão entre as tarefas mais perigosas: a energia residual e a possibilidade de partida remota tornam o bloqueio indispensável.',
      'Correias de longo curso podem ser acionadas de pontos distantes, o que exige bloqueio físico e comunicação rigorosa antes de qualquer acesso.',
    ],
    riscos: [
      'Aprisionamento em britadores e moinhos',
      'Arraste em correias transportadoras',
      'Partida remota de equipamentos',
      'Energia residual em sistemas de grande porte',
    ],
  },
  {
    id: 'borracha',
    name: 'Borracha',
    lead: 'Misturadores, calandras e prensas de vulcanização com calor e prensagem combinados.',
    img: '/uploads/setores/borracha.jpg',
    intro: [
      'A indústria da borracha trabalha com misturadores (banbury), calandras, extrusoras e prensas de vulcanização — equipamentos que combinam calor, pressão e partes móveis de grande força.',
      'A produção de pneus e artefatos exige intervenções frequentes de limpeza, troca de molde e ajuste, sempre próximas a pontos de esmagamento e superfícies quentes.',
    ],
    comoAtua: [
      'Calandras e misturadores concentram risco de arraste e esmagamento; prensas de vulcanização adicionam calor e fechamento de força. A limpeza com a máquina energizada é causa recorrente de acidentes graves.',
      'O isolamento térmico e mecânico, somado ao bloqueio elétrico e hidráulico, é essencial antes de cada acesso.',
    ],
    riscos: [
      'Esmagamento em calandras e misturadores',
      'Queimaduras em prensas de vulcanização',
      'Fechamento de força em moldes',
      'Energia hidráulica e térmica combinadas',
    ],
  },
  {
    id: 'agronegocio',
    name: 'Agronegócio',
    lead: 'Secadores, elevadores de canecas e silos com risco de arraste, soterramento e atmosferas explosivas.',
    img: '/uploads/setores/agronegocio.jpg',
    intro: [
      'O agronegócio, em sua etapa industrial, opera unidades de armazenagem e processamento — secadores, elevadores de canecas, roscas transportadoras e silos — que movimentam grãos em grande volume.',
      'Além das partes móveis, o setor lida com risco de atmosferas explosivas por poeira e de soterramento em silos, o que amplia a importância do controle de energia e do acesso seguro.',
    ],
    comoAtua: [
      'Desobstruções de roscas e elevadores e a entrada em silos são tarefas críticas: a partida acidental de um transportador ou o escoamento de grão podem ser fatais.',
      'O bloqueio dos acionamentos e o controle de espaço confinado caminham juntos na proteção dessas operações.',
    ],
    riscos: [
      'Arraste em roscas e elevadores de canecas',
      'Soterramento em silos',
      'Atmosferas explosivas por poeira de grão',
      'Partida acidental de transportadores',
    ],
  },
  {
    id: 'construcao',
    name: 'Construção Civil',
    lead: 'Centrais de concreto, gruas e equipamentos elétricos em canteiros dinâmicos e mutáveis.',
    img: '/uploads/setores/construcao.jpg',
    intro: [
      'A construção civil pesada e a indústria de pré-fabricados operam centrais de concreto, gruas, elevadores de obra, betoneiras e equipamentos elétricos em canteiros que mudam de configuração constantemente.',
      'O caráter dinâmico do canteiro e a rotatividade de equipes tornam a padronização de procedimentos de segurança um desafio permanente.',
    ],
    comoAtua: [
      'Manutenções em centrais de concreto e a intervenção em equipamentos elétricos provisórios exigem bloqueio confiável, num ambiente onde as instalações nem sempre são definitivas.',
      'A sinalização clara e o bloqueio físico evitam acionamentos por terceiros em meio à movimentação intensa do canteiro.',
    ],
    riscos: [
      'Risco elétrico em instalações provisórias',
      'Esmagamento em centrais de concreto',
      'Acionamento por terceiros no canteiro',
      'Rotatividade de equipes e baixa padronização',
    ],
  },
  {
    id: 'madeireira',
    name: 'Indústria Madeireira',
    lead: 'Serras, plainas e prensas com altíssimo potencial de corte e amputação.',
    img: '/uploads/setores/madeireira.jpg',
    intro: [
      'A indústria madeireira e moveleira opera serras, plainas, lixadeiras, prensas e linhas de usinagem que cortam e conformam madeira em alta velocidade.',
      'É um setor com um dos maiores índices de lesão em mãos da indústria, dado o contato direto com lâminas e ferramentas de corte.',
    ],
    comoAtua: [
      'Trocas de lâmina, desobstruções e limpeza aproximam o operador de serras e plainas que retêm energia e podem partir inesperadamente. A ausência de bloqueio em ajustes rápidos é a principal causa de amputações.',
      'Prensas de colagem e laminação adicionam risco de esmagamento e exigem isolamento mecânico e hidráulico.',
    ],
    riscos: [
      'Amputação em serras e plainas',
      'Esmagamento em prensas',
      'Partida inesperada em ajustes rápidos',
      'Alto índice de lesões em mãos',
    ],
  },
  {
    id: 'plastico',
    name: 'Plásticos e Embalagens',
    lead: 'Injetoras, extrusoras e sopradoras com molde de fechamento de força e material fundido.',
    img: '/uploads/setores/plastico.jpg',
    intro: [
      'O setor de plásticos e embalagens opera injetoras, extrusoras, sopradoras e termoformadoras — máquinas que fundem e conformam polímeros sob pressão e temperatura.',
      'A alta produtividade exige trocas de molde, purgas e desobstruções frequentes, sempre próximas a zonas de fechamento de força e material fundido.',
    ],
    comoAtua: [
      'O fechamento do molde em injetoras e sopradoras concentra risco de esmagamento e amputação; o material fundido adiciona risco de queimadura. Intervir sem bloqueio durante uma purga ou troca rápida é uma exposição séria.',
      'O isolamento elétrico, hidráulico e térmico antes de cada acesso é o que separa uma troca de molde segura de um acidente grave.',
    ],
    riscos: [
      'Esmagamento no fechamento de moldes',
      'Queimaduras por material fundido',
      'Energia hidráulica residual',
      'Intervenções rápidas sem bloqueio',
    ],
  },
];

export function getSetorById(id: string): SetorData | undefined {
  return setores.find((s) => s.id === id);
}
