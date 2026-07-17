import { z } from 'zod';
import { isValidBrPhone, isValidCpfCnpj } from './cpfCnpj';

const cnpjField = z
  .string()
  .max(30)
  .optional()
  .nullable()
  .refine((v) => !v || isValidCpfCnpj(v), 'CNPJ/CPF inválido');

export const quoteItemSchema = z.object({
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(200),
  quantity: z.number().int().min(1).max(9999),
  variantLabel: z.string().max(100).optional().nullable(),
  productId: z.string().max(50).optional().nullable(),
});

export const quoteRequestSchema = z.object({
  name: z.string().min(2, 'Informe seu nome').max(120),
  email: z.string().email('E-mail inválido').max(200),
  phone: z
    .string()
    .min(1, 'Informe seu telefone')
    .max(30)
    .refine((v) => isValidBrPhone(v), 'Telefone inválido'),
  company: z.string().max(200).optional().nullable(),
  city: z.string().max(120).optional().nullable(),
  cnpj: cnpjField,
  purpose: z.string().max(200).optional().nullable(),
  message: z.string().max(3000).optional().nullable(),
  items: z.array(quoteItemSchema).min(1, 'Adicione ao menos um item').max(50, 'Máximo de 50 itens por orçamento'),
});
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Informe seu nome').max(120),
  email: z.string().email('E-mail inválido').max(200),
  phone: z
    .string()
    .max(30)
    .optional()
    .nullable()
    .refine((v) => !v || isValidBrPhone(v), 'Telefone inválido'),
  subject: z.string().max(200).optional().nullable(),
  cnpj: cnpjField,
  message: z.string().min(5, 'Escreva sua mensagem').max(5000),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const newsletterSubscribeSchema = z.object({
  name: z.string().min(2, 'Informe seu nome').max(120),
  email: z.string().email('E-mail inválido').max(200),
});
export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;

export const productSchema = z.object({
  code: z.string().min(1, 'Informe o SKU').max(50),
  name: z.string().min(2, 'Informe o nome').max(200),
  ncm: z.string().max(20).optional().nullable(),
  isCadeado: z.boolean().default(false),
  categoryId: z.string().min(1, 'Selecione a categoria'),
  subcategoryId: z.string().optional().nullable(),
  description: z.array(z.string().max(2000)).max(50).default([]),
  supportText: z.string().max(5000).optional().nullable(),
  filterTags: z.array(z.string()).max(100).default([]),
  coverUrl: z.string().optional().nullable(),
  active: z.boolean().default(true),
});
export type ProductInput = z.infer<typeof productSchema>;

export const postSchema = z.object({
  title: z.string().min(2, 'Informe o título').max(200),
  slug: z.string().min(2).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1, 'Escreva o conteúdo').max(50000),
  coverUrl: z.string().url().optional().nullable(),
  tag: z.string().max(50).optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});
export type PostInput = z.infer<typeof postSchema>;
