import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadImage } from '@/lib/storage';
import { sniffImageType } from '@/lib/image-sniff';

const EXT_BY_TYPE = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' } as const;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const folder = ((form.get('folder') as string) || 'uploads').replace(/[^a-z0-9/_-]/gi, '');

  if (!file) return NextResponse.json({ error: 'Arquivo ausente' }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Imagem acima de 8 MB' }, { status: 400 });
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const detectedType = sniffImageType(bytes);
    if (!detectedType) {
      return NextResponse.json({ error: 'Envie um PNG, JPEG, WEBP ou GIF válido' }, { status: 400 });
    }
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${EXT_BY_TYPE[detectedType]}`;
    const url = await uploadImage(key, bytes, detectedType);
    return NextResponse.json({ url });
  } catch (e) {
    console.error('upload', e);
    return NextResponse.json({ error: 'Falha no upload' }, { status: 500 });
  }
}
