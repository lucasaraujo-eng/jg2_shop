import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Login Admin | JG2' },
  description: 'Acesso restrito ao painel administrativo JG2®.',
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
