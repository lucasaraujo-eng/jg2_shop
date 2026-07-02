import { z } from 'zod';

// ---------- Orçamento ----------
export const quoteItemSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1),
  variantLabel: z.string().optional().nullable(),
  productId: z.string().optional().nullable(),
});

export const quoteRequestSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(8, 'Telefone inválido'),
  cnpj: z.string().min(11, 'CNPJ/CPF inválido'),
  purpose: z.string().min(2, 'Informe a finalidade'),
  message: z.string().optional().nullable(),
  items: z.array(quoteItemSchema).min(1, 'Adicione ao menos um item'),
});
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

// ---------- Contato (fale conosco — sem itens/CNPJ, mensagem avulsa) ----------
export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(5, 'Escreva sua mensagem'),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

// ---------- Produto (admin) ----------
export const productSchema = z.object({
  code: z.string().min(1, 'Informe o SKU'),
  name: z.string().min(2, 'Informe o nome'),
  ncm: z.string().optional().nullable(),
  isCadeado: z.boolean().default(false),
  categoryId: z.string().min(1, 'Selecione a categoria'),
  subcategoryId: z.string().optional().nullable(),
  description: z.array(z.string()).default([]),
  supportText: z.string().optional().nullable(),
  filterTags: z.array(z.string()).default([]),
  coverUrl: z.string().optional().nullable(),
  active: z.boolean().default(true),
});
export type ProductInput = z.infer<typeof productSchema>;

// ---------- Blog (admin) ----------
export const postSchema = z.object({
  title: z.string().min(2, 'Informe o título'),
  slug: z.string().min(2),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(1, 'Escreva o conteúdo'),
  coverUrl: z.string().url().optional().nullable(),
  tag: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});
export type PostInput = z.infer<typeof postSchema>;
