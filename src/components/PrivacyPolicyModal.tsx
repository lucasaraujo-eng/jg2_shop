'use client';

import { useEffect } from 'react';

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: '1. Identificação da Controladora',
    body: [
      'A controladora dos dados pessoais tratados nos termos desta Política é:',
      'JG2 Produtos de Segurança LTDA\nCNPJ: 44.493.820/0001-38\nEndereço: Rua das Palmeiras, nº 95, Distrito Industrial de Timóteo - MG, Brasil\nE-mail: contato@jg2ps.com.br\nTelefone: 31 996690692\nSite oficial: www.jg2ps.com.br',
      'Para assuntos relacionados à privacidade, proteção de dados e exercício de direitos do titular, a JG2 disponibiliza o seguinte canal de contato:',
      'Canal de Privacidade: contato@jg2ps.com.br',
      'No momento, a JG2 não possui designação formal de encarregado pelo tratamento de dados pessoais. As demandas relacionadas à privacidade e à proteção de dados são centralizadas pelo canal acima indicado.',
    ],
  },
  {
    title: '2. A quem esta Política se aplica',
    body: [
      'Esta Política se aplica aos dados pessoais tratados pela JG2 em interações com visitantes do site, leads, clientes, representantes de clientes, fornecedores, parceiros, prestadores de serviço, participantes de treinamentos, candidatos a vagas e quaisquer pessoas físicas que mantenham relacionamento conosco por meios físicos ou digitais.',
    ],
  },
  {
    title: '3. Quais dados pessoais podemos coletar',
    body: [
      'A depender da natureza da relação mantida com a JG2, poderemos coletar dados pessoais como nome, sobrenome, cargo, departamento, empresa, e-mail corporativo, telefone, celular, WhatsApp, perfil profissional, cidade, estado e demais informações fornecidas voluntariamente em formulários, solicitações de contato, propostas, treinamentos, auditorias, consultorias e comunicações em geral.',
      'Também poderemos tratar dados relacionados ao contexto profissional e operacional do titular, como segmento de atuação, tipo de demanda, interesse em produtos ou serviços, informações sobre equipamentos, aplicações, pontos de bloqueio, estrutura operacional e demais dados necessários para atendimento técnico, comercial ou institucional.',
      'Em nossos ambientes digitais, também poderão ser coletados dados de navegação, tais como endereço IP, data e hora de acesso, páginas visitadas, cliques, origem do tráfego, navegador, sistema operacional, identificadores de dispositivo e dados obtidos por meio de cookies e tecnologias semelhantes.',
      'Quando aplicável a processos de recrutamento e seleção, poderemos tratar dados profissionais encaminhados voluntariamente, como currículo, histórico profissional, formação acadêmica e experiências.',
      'A JG2 não tem como prática tratar dados pessoais sensíveis, salvo quando isso for estritamente necessário, permitido por lei e limitado ao mínimo indispensável para a finalidade pretendida.',
    ],
  },
  {
    title: '4. Como os dados são coletados',
    body: [
      'Os dados pessoais podem ser coletados diretamente com o titular, por meio do preenchimento de formulários, envio de mensagens, solicitações de contato, downloads de materiais, contratação de serviços, aquisição de produtos e participação em treinamentos, auditorias, consultorias, visitas técnicas e outros atendimentos.',
      'Também poderão ser coletados automaticamente por meio de cookies, logs e ferramentas de análise de navegação, bem como por intermédio de parceiros ou prestadores de serviços legitimamente envolvidos na relação, sempre dentro dos limites legais e contratuais aplicáveis.',
    ],
  },
  {
    title: '5. Finalidades do tratamento de dados pessoais',
    body: [
      'A JG2 trata dados pessoais para finalidades legítimas, específicas e compatíveis com sua atuação empresarial. Entre essas finalidades estão o atendimento a solicitações comerciais, técnicas e institucionais; a elaboração de propostas e orçamentos; a condução de contatos, reuniões, treinamentos e auditorias; a disponibilização de catálogos, materiais técnicos e conteúdos; a execução de contratos; o fornecimento de produtos e serviços; a melhoria da experiência de navegação; a análise de desempenho de campanhas e formulários; a proteção de ambientes físicos e digitais; o cumprimento de obrigações legais e regulatórias; o exercício regular de direitos; e a condução de processos seletivos, quando aplicável.',
    ],
  },
  {
    title: '6. Bases legais utilizadas',
    body: [
      'O tratamento de dados pessoais pela JG2 poderá ocorrer com fundamento em uma ou mais bases legais previstas na LGPD, conforme o caso concreto. Entre elas estão o consentimento do titular, o cumprimento de obrigação legal ou regulatória, a execução de contrato ou de procedimentos preliminares relacionados a contrato, o exercício regular de direitos em processo judicial, administrativo ou arbitral, o legítimo interesse da empresa e outras hipóteses legalmente admitidas.',
      'A base legal aplicável poderá variar conforme o tipo de dado, a finalidade do tratamento e o contexto da relação.',
    ],
  },
  {
    title: '7. Compartilhamento de dados pessoais',
    body: [
      'A JG2 poderá compartilhar dados pessoais quando isso for necessário para a execução legítima de suas atividades, sempre em observância à legislação aplicável e aos princípios da necessidade, adequação e segurança.',
      'Esse compartilhamento pode ocorrer com empresas do Grupo JG2, prestadores de serviços de tecnologia, hospedagem, analytics, CRM, automação de comunicação, suporte operacional, assessorias técnicas, consultorias, parceiros comerciais, transportadoras, operadores logísticos, escritórios contábeis e jurídicos, bem como com autoridades públicas, órgãos reguladores ou entidades competentes, quando houver obrigação legal, requisição válida ou necessidade de exercício regular de direitos.',
      'A JG2 não comercializa dados pessoais.',
    ],
  },
  {
    title: '8. Transferência internacional de dados',
    body: [
      'Alguns fornecedores de tecnologia contratados pela JG2 poderão armazenar ou processar dados em servidores localizados fora do Brasil. Quando isso ocorrer, a empresa buscará adotar medidas razoáveis para assegurar que a transferência internacional ocorra em conformidade com a LGPD e com padrões adequados de proteção da informação.',
    ],
  },
  {
    title: '9. Cookies e tecnologias semelhantes',
    body: [
      'O site da JG2 pode utilizar cookies e tecnologias semelhantes para permitir o funcionamento adequado das páginas, aprimorar a navegação, compreender o comportamento do usuário, mensurar audiência, melhorar conteúdos e apoiar campanhas institucionais e comerciais, quando aplicável.',
      'Essas tecnologias podem incluir cookies necessários, cookies de desempenho, cookies funcionais e, se utilizados no ambiente digital da empresa, cookies de marketing ou mensuração de campanhas.',
      'O usuário poderá gerenciar preferências de cookies por meio das configurações do navegador e, quando aplicável, por ferramentas disponibilizadas no próprio site. A desativação de determinados cookies pode impactar a funcionalidade de algumas páginas.',
    ],
  },
  {
    title: '10. Retenção e armazenamento dos dados',
    body: [
      'Os dados pessoais serão armazenados apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, inclusive para atendimento da solicitação do titular, execução contratual, cumprimento de obrigações legais, regulatórias, fiscais e contábeis, manutenção de histórico técnico e comercial, prevenção a fraudes, segurança da informação e exercício regular de direitos.',
      'Após o término da necessidade de tratamento, os dados poderão ser eliminados, anonimizados ou mantidos de forma bloqueada, conforme permitido pela LGPD.',
    ],
  },
  {
    title: '11. Segurança da informação',
    body: [
      'A JG2 adota medidas técnicas, administrativas e organizacionais razoáveis para proteger os dados pessoais contra acesso não autorizado, perda, destruição, alteração, divulgação indevida ou qualquer forma de tratamento inadequado ou ilícito.',
      'Essas medidas incluem, quando aplicável, controle de acesso a sistemas e informações, gestão de permissões, autenticação, revisão de processos internos, seleção criteriosa de fornecedores, uso de ambientes tecnológicos compatíveis com o risco e orientação interna sobre boas práticas de segurança e confidencialidade.',
      'Embora a empresa adote medidas compatíveis com o padrão esperado de mercado, nenhum ambiente físico ou digital é absolutamente invulnerável.',
    ],
  },
  {
    title: '12. Direitos do titular',
    body: [
      'Nos termos da LGPD, o titular poderá solicitar confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos, inexatos ou desatualizados, anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade, portabilidade quando aplicável, eliminação de dados tratados com base em consentimento, informações sobre compartilhamento, informações sobre a possibilidade de não fornecer consentimento e revogação do consentimento, quando essa for a base legal do tratamento.',
      'O titular também poderá se opor ao tratamento realizado em desconformidade com a LGPD, observadas as hipóteses legais e regulatórias aplicáveis.',
      'As solicitações devem ser encaminhadas para: contato@jg2ps.com.br.',
      'Para proteção do próprio titular, a JG2 poderá solicitar informações adicionais para confirmação de identidade antes de responder à solicitação.',
    ],
  },
  {
    title: '13. Comunicações institucionais, técnicas e comerciais',
    body: [
      'A JG2 poderá enviar comunicações relacionadas a seus produtos, serviços, treinamentos, auditorias, consultorias, catálogos, conteúdos, eventos, campanhas institucionais e materiais técnicos, desde que exista base legal válida para isso.',
      'Quando aplicável, o titular poderá solicitar a interrupção de comunicações promocionais por meio dos canais indicados na própria mensagem ou pelo canal de privacidade informado nesta Política.',
      'Comunicações estritamente necessárias à execução contratual, à continuidade operacional do relacionamento, ao suporte técnico ou ao cumprimento de obrigações legais poderão continuar sendo enviadas quando pertinentes.',
    ],
  },
  {
    title: '14. Crianças e adolescentes',
    body: [
      'Os canais da JG2 não são direcionados intencionalmente a crianças. Caso haja, de forma excepcional, tratamento de dados de adolescentes ou de crianças em situações legalmente permitidas, a empresa buscará observar os requisitos legais aplicáveis e limitar o tratamento ao mínimo necessário.',
    ],
  },
  {
    title: '15. Links para sites e serviços de terceiros',
    body: [
      'Os canais digitais da JG2 podem conter links para sites, plataformas, catálogos externos, redes sociais, vídeos e serviços de terceiros. Esta Política não se aplica a ambientes que não sejam controlados pela empresa. Recomendamos que o usuário consulte as políticas de privacidade desses terceiros antes de fornecer qualquer dado pessoal.',
    ],
  },
  {
    title: '16. Recrutamento e seleção',
    body: [
      'Quando o titular encaminhar currículo ou informações profissionais para fins de recrutamento e seleção, esses dados poderão ser utilizados para análise de perfil, triagem, contato com o candidato, condução do processo seletivo e formação de banco de talentos, quando permitido. O tratamento será limitado a essas finalidades.',
    ],
  },
  {
    title: '17. Atualizações desta Política',
    body: [
      'A JG2 poderá atualizar esta Política de Privacidade a qualquer tempo para refletir alterações legais, regulatórias, tecnológicas, operacionais ou institucionais. A versão vigente será sempre a última publicada nos canais oficiais da empresa, com indicação da respectiva data de atualização.',
    ],
  },
  {
    title: '18. Canal de contato sobre privacidade',
    body: [
      'Em caso de dúvidas, solicitações ou exercício de direitos relacionados ao tratamento de dados pessoais, entre em contato com a JG2:',
      'JG2 Produtos de Segurança LTDA\nCNPJ: 44.493.820/0001-38\nEndereço: Rua das Palmeiras, nº 95, Distrito Industrial de Timóteo - MG, Brasil\nE-mail: contato@jg2ps.com.br\nTelefone: 31 996690692\nSite oficial: www.jg2ps.com.br',
    ],
  },
  {
    title: '19. Legislação aplicável',
    body: [
      'Esta Política será interpretada de acordo com a legislação brasileira, especialmente a Lei nº 13.709/2018 (LGPD), o Marco Civil da Internet e as demais normas aplicáveis à proteção de dados, privacidade e segurança da informação.',
    ],
  },
];

export function PrivacyPolicyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Política de Privacidade e Proteção de Dados Pessoais">
      <button className="absolute inset-0 bg-ink/50" style={{ animation: 'jg-fade .2s ease both' }} onClick={onClose} aria-label="Fechar" />

      <div
        className="relative flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,.3)]"
        style={{ animation: 'jg-up .26s ease both' }}
      >
        <header className="flex flex-none items-start justify-between gap-4 border-b border-border-soft p-6">
          <div>
            <h2 className="font-display text-xl font-black text-ink">Política de Privacidade e Proteção de Dados Pessoais</h2>
            <p className="mt-1 text-xs text-tertiary">JG2 Produtos de Segurança LTDA · Última atualização: 26/05/2026</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-ink/60 transition hover:bg-surface-alt hover:text-brand"
          >
            ✕
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <p className="text-sm leading-relaxed text-muted-2">
            A JG2 Produtos de Segurança LTDA trata a privacidade, a confidencialidade e a segurança da informação como
            compromissos permanentes de sua atuação. Esta Política de Privacidade e Proteção de Dados Pessoais explica,
            de forma clara e transparente, como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os
            dados pessoais das pessoas que interagem com nossos canais, produtos, serviços e conteúdos.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-2">
            Esta Política foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº
            13.709/2018), com o Marco Civil da Internet (Lei nº 12.965/2014) e com as demais normas aplicáveis à
            privacidade, à proteção de dados e à segurança da informação.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-2">
            Ao acessar o site da JG2, preencher formulários, solicitar contato, baixar materiais, participar de
            treinamentos, contratar serviços, adquirir produtos ou manter qualquer tipo de relacionamento conosco,
            você declara estar ciente desta Política, nos limites aplicáveis à sua interação com a empresa.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h3 className="font-display text-[15px] font-black text-ink">{s.title}</h3>
                <div className="mt-2 flex flex-col gap-2.5">
                  {s.body.map((p, i) => (
                    <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-muted-2">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-none border-t border-border-soft p-5">
          <button onClick={onClose} className="w-full rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark">
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
