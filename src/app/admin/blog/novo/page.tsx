import Link from 'next/link';
import { PostForm } from '@/components/admin/PostForm';
import { getSetorById, setorAsPostInput } from '@/data/setores';

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ fromSetor?: string }>;
}) {
  const { fromSetor } = await searchParams;
  const sector = fromSetor ? getSetorById(fromSetor) : undefined;
  const initial = sector ? setorAsPostInput(sector) : undefined;

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Blog
      </Link>
      <h1 className="mt-3 font-display text-2xl font-black text-ink">
        {sector ? `Editar matéria · ${sector.name}` : 'Nova matéria'}
      </h1>
      {sector && (
        <p className="mt-1 text-sm text-tertiary">
          Ao salvar, esta matéria entra no blog e passa a ser editável por aqui. O slug precisa permanecer{' '}
          <span className="font-mono">{sector.id}</span>.
        </p>
      )}
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <PostForm initial={initial} />
      </div>
    </div>
  );
}
