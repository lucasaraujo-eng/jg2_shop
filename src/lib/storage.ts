import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

/**
 * Cloudflare R2 (S3-compatível). USAR APENAS NO SERVIDOR
 * (Server Actions / route handlers). Nunca importar em client components.
 */
function getClient() {
  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    return null;
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

const BUCKET = process.env.R2_BUCKET ?? 'jg2-produtos';
const PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');

/** Faz upload de um arquivo e devolve a URL pública. */
export async function uploadImage(
  path: string,
  file: Uint8Array | Buffer,
  contentType: string,
): Promise<string> {
  const r2 = getClient();
  if (!r2) {
    throw new Error(
      'Cloudflare R2 não configurado (R2_ACCOUNT_ID/R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY ausentes).',
    );
  }
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: path,
      Body: file,
      ContentType: contentType,
    }),
  );
  return `${PUBLIC_URL}/${path}`;
}

export async function deleteImage(path: string): Promise<void> {
  const r2 = getClient();
  if (!r2) return;
  await r2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: path }));
}
