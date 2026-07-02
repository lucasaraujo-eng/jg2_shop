import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadImage } from '@/lib/storage';

// Upload de imagem (multipart) → Cloudflare R2. Restrito a admins.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const folder = ((form.get('folder') as string) || 'uploads').replace(/[^a-z0-9/_-]/gi, '');

  if (!file) return NextResponse.json({ error: 'Arquivo ausente' }, { status: 400 });
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Envie um arquivo de imagem' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Imagem acima de 8 MB' }, { status: 400 });
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const url = await uploadImage(key, bytes, file.type);
    return NextResponse.json({ url });
  } catch (e) {
    console.error('upload', e);
    return NextResponse.json({ error: 'Falha no upload' }, { status: 500 });
  }
}
