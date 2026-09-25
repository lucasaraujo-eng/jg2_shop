import { prisma } from '@/lib/prisma';
import { CACHE_TAGS, cachedQuery } from '@/lib/data-cache';

const tags = [CACHE_TAGS.blog];

export const getActiveVideos = cachedQuery('videos:active', tags, async () =>
  prisma.video.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  }),
);
