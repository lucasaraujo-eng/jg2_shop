import type { Metadata } from 'next';
import { Figtree, Archivo, Space_Mono } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'JG2 Produtos de Segurança',
  description:
    'Catálogo de produtos de segurança industrial — bloqueio e etiquetagem (LOTO) e Mãos Seguras.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${archivo.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
