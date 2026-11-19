import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminCategory } from '@/server/actions/categories';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { parseSupportJson } from '@/lib/productSupport';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getAdminCategory(id);
  if (!category) notFound();

  return (
    <div>
      <Link href="/admin/categorias" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Categorias
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-black text-ink">{category.name}</h1>
        <Link href={`/produtos/${category.slug}`} target="_blank" className="text-sm font-bold text-brand hover:text-brand-dark">
          Ver no site →
        </Link>
      </div>
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <CategoryForm
          categoryId={category.id}
          initial={{
            supportText: category.supportText ?? '',
            seoTitle: category.seoTitle ?? '',
            seoDescription: category.seoDescription ?? '',
            supportHeading: category.supportHeading ?? '',
            supportTldr: category.supportTldr ?? '',
            supportIdealFor: category.supportIdealFor ?? '',
            supportNotFor: category.supportNotFor ?? '',
            supportJson: parseSupportJson(category.supportJson),
          }}
          subcategories={category.subcategories.map((s) => ({
            id: s.id,
            name: s.name,
            supportText: s.supportText ?? '',
            seoTitle: s.seoTitle ?? '',
            seoDescription: s.seoDescription ?? '',
          }))}
          isMaosSeguras={category.type === 'MAOS_SEGURAS'}
        />
      </div>
    </div>
  );
}
