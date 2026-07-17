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
  company?: string | null;
  city?: string | null;
  cnpj?: string | null;
  purpose?: string | null;
  message?: string | null;
  items: QuoteItem[];
};

type ContactPayload = {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  cnpj?: string | null;
  message: string;
};

type NewsletterPayload = {
  name: string;
  email: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function itemsTable(items: QuoteItem[]): string {
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;font-family:monospace;color:#b5202b;">${escapeHtml(i.code)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(i.name)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i.variantLabel ? escapeHtml(i.variantLabel) : '—'}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
      </tr>`,
    )
    .join('');
  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="text-align:left;color:#888;">
          <th style="padding:8px;">SKU</th><th style="padding:8px;">Produto</th><th style="padding:8px;">Variação</th><th style="padding:8px;text-align:center;">Qtd</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

export async function sendQuoteEmails(q: QuotePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const adminTo = process.env.QUOTE_TO_EMAIL;
  const adminCc = process.env.QUOTE_TO_EMAIL_2;

  if (!apiKey || !from || !adminTo) {
    console.warn(
      `[email] RESEND_API_KEY/QUOTE_FROM_EMAIL/QUOTE_TO_EMAIL ausentes — orçamento #${q.id} não enviado por e-mail (apenas registrado no banco).`,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const adminRecipients = adminCc ? [adminTo, adminCc] : adminTo;

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Novo pedido de orçamento — #${q.id.slice(0, 8)}</h2>
      <p><strong>Cliente:</strong> ${escapeHtml(q.name)}<br/>
         <strong>E-mail:</strong> ${escapeHtml(q.email)}<br/>
         <strong>Telefone:</strong> ${escapeHtml(q.phone)}<br/>
         ${q.company ? `<strong>Empresa:</strong> ${escapeHtml(q.company)}<br/>` : ''}
         ${q.city ? `<strong>Cidade/UF:</strong> ${escapeHtml(q.city)}<br/>` : ''}
         ${q.cnpj ? `<strong>CNPJ/CPF:</strong> ${escapeHtml(q.cnpj)}<br/>` : ''}
         ${q.purpose ? `<strong>Finalidade:</strong> ${escapeHtml(q.purpose)}<br/>` : ''}</p>
      ${q.message ? `<p><strong>Mensagem:</strong><br/>${escapeHtml(q.message)}</p>` : ''}
      <h3>Itens</h3>
      ${itemsTable(q.items)}
    </div>`;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Recebemos seu pedido de orçamento</h2>
      <p>Olá, ${escapeHtml(q.name)}! Obrigado pelo interesse. Nossa equipe vai analisar os itens abaixo e retornar com valores e prazos.</p>
      ${itemsTable(q.items)}
      <p style="margin-top:24px;color:#888;font-size:13px;">JG2® Produtos de Segurança</p>
    </div>`;

  await resend.emails.send({
    from,
    to: adminRecipients,
    replyTo: q.email,
    subject: `Orçamento #${q.id.slice(0, 8)} — ${q.name}`,
    html: adminHtml,
  });

  await resend.emails.send({
    from,
    to: q.email,
    subject: 'Recebemos seu pedido de orçamento — JG2®',
    html: clientHtml,
  });
}

export async function sendContactEmail(c: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const adminTo = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !from || !adminTo) {
    console.warn('[email] RESEND_API_KEY/QUOTE_FROM_EMAIL/QUOTE_TO_EMAIL ausentes — mensagem de contato não enviada.');
    return;
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${escapeHtml(c.name)}<br/>
         <strong>E-mail:</strong> ${escapeHtml(c.email)}<br/>
         ${c.phone ? `<strong>Telefone:</strong> ${escapeHtml(c.phone)}<br/>` : ''}
         ${c.subject ? `<strong>Assunto:</strong> ${escapeHtml(c.subject)}<br/>` : ''}
         ${c.cnpj ? `<strong>CNPJ/CPF:</strong> ${escapeHtml(c.cnpj)}<br/>` : ''}</p>
      <p><strong>Mensagem:</strong><br/>${escapeHtml(c.message)}</p>
    </div>`;

  await resend.emails.send({
    from,
    to: adminTo,
    replyTo: c.email,
    subject: c.subject ? `Contato — ${c.subject}` : `Contato — ${c.name}`,
    html,
  });
}

export async function sendNewsletterEmail(n: NewsletterPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const adminTo = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !from || !adminTo) {
    console.warn('[email] RESEND_API_KEY/QUOTE_FROM_EMAIL/QUOTE_TO_EMAIL ausentes — inscrição de newsletter não enviada.');
    return;
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#b5202b;">Nova inscrição na newsletter</h2>
      <p><strong>Nome:</strong> ${escapeHtml(n.name)}<br/>
         <strong>E-mail:</strong> ${escapeHtml(n.email)}</p>
    </div>`;

  await resend.emails.send({
    from,
    to: adminTo,
    replyTo: n.email,
    subject: `Newsletter — ${n.name}`,
    html,
  });
}
