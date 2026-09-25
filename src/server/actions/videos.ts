'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { videoSchema, type VideoInput } from '@/lib/validations';
import { requireAdmin, requireRoleResult } from '@/lib/auth-guards';
import { invalidateBlogCache } from '@/lib/data-cache';
import { youtubeVideoId } from '@/lib/youtube';

type Result = { ok: true; id: string } | { ok: false; error: string };

export async function createVideo(input: VideoInput): Promise<Result> {
  await requireAdmin();
  const parsed = videoSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  if (!youtubeVideoId(d.youtubeUrl)) {
    return { ok: false, error: 'Informe um link válido do YouTube.' };
  }
  try {
    const video = await prisma.video.create({
      data: {
        title: d.title,
        description: d.description ?? null,
        youtubeUrl: d.youtubeUrl,
        order: d.order,
        active: d.active,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/videos');
    revalidatePath('/videos');
    return { ok: true, id: video.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao criar o vídeo.' };
  }
}

export async function updateVideo(id: string, input: VideoInput): Promise<Result> {
  await requireAdmin();
  const parsed = videoSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  if (!youtubeVideoId(d.youtubeUrl)) {
    return { ok: false, error: 'Informe um link válido do YouTube.' };
  }
  try {
    const video = await prisma.video.update({
      where: { id },
      data: {
        title: d.title,
        description: d.description ?? null,
        youtubeUrl: d.youtubeUrl,
        order: d.order,
        active: d.active,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/videos');
    revalidatePath('/videos');
    return { ok: true, id: video.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar o vídeo.' };
  }
}

export async function deleteVideo(id: string): Promise<Result> {
  const session = await requireRoleResult('ADMIN');
  if (!session) return { ok: false, error: 'Apenas administradores podem remover vídeos.' };
  try {
    await prisma.video.delete({ where: { id } });
    invalidateBlogCache();
    revalidatePath('/admin/videos');
    revalidatePath('/videos');
    return { ok: true, id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao remover o vídeo.' };
  }
}

export async function listAdminVideos() {
  await requireAdmin();
  return prisma.video.findMany({ orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }] });
}

export async function getAdminVideo(id: string) {
  await requireAdmin();
  return prisma.video.findUnique({ where: { id } });
}
