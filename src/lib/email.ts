import { Resend } from 'resend';

type QuoteItem = {
  code: string;
  name: string;
  quantity: number;
  variantLabel?: string | null;
};

type QuotePayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  purpose: string;
  message?: string | null;
  items: QuoteItem[];
};

function itemsTable(items: QuoteItem[]): string {
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;font-family:monospace;color:#b5202b;">${i.code}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i.name}${
          i.variantLabel ? ` <em style="color:#888;">(${i.variantLabel})</em>` : ''
        }</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
      </tr>`,
    )
    .join('');
  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="text-align:left;color:#888;">
          <th style="padding:8px;">Código</th><th style="padding:8px;">Produto</th><th style="padding:8px;text-align:center;">Qtd</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/**
 * Envia o orçamento para a administração e uma confirmação ao cliente.
 * Sem RESEND_API_KEY configurada (ex.: Bloco 1 em dev), apenas loga —
 * evita quebrar o fluxo de orçamento enquanto a conta Resend não existe.
 */
export async function sendQuoteEmails(q: QuotePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const adminTo = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !from || !adminTo) {
    console.warn(
      `[email] RESEND_API_KEY/QUOTE_FROM_EMAIL/QUOTE_TO_EMAIL ausentes — orçamento #${q.id} não enviado por e-mail (apenas registrado no banco).`,
    );
    return;
  }

  const resend = new Resend(apiKey);

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Novo pedido de orçamento — #${q.id.slice(0, 8)}</h2>
      <p><strong>Cliente:</strong> ${q.name}<br/>
         <strong>E-mail:</strong> ${q.email}<br/>
         <strong>Telefone:</strong> ${q.phone}<br/>
         <strong>CNPJ:</strong> ${q.cnpj}<br/>
         <strong>Finalidade:</strong> ${q.purpose}</p>
      ${q.message ? `<p><strong>Mensagem:</strong><br/>${q.message}</p>` : ''}
      <h3>Itens</h3>
      ${itemsTable(q.items)}
    </div>`;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Recebemos seu pedido de orçamento</h2>
      <p>Olá, ${q.name}! Obrigado pelo interesse. Nossa equipe vai analisar os itens abaixo e retornar com valores e prazos.</p>
      ${itemsTable(q.items)}
      <p style="margin-top:24px;color:#888;font-size:13px;">JG2 Produtos de Segurança</p>
    </div>`;

  await resend.emails.send({
    from,
    to: adminTo,
    replyTo: q.email,
    subject: `Orçamento #${q.id.slice(0, 8)} — ${q.name}`,
    html: adminHtml,
  });

  await resend.emails.send({
    from,
    to: q.email,
    subject: 'Recebemos seu pedido de orçamento — JG2',
    html: clientHtml,
  });
}
