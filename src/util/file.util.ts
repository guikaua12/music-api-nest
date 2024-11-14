import { Express } from 'express';
import { parseBuffer } from 'music-metadata';

export async function getTitleMetadata(
  file: Express.Multer.File,
): Promise<string | null> {
  const buffer = file.buffer;
  const metadata = await parseBuffer(buffer, file.mimetype);
  return metadata.common.title || null;
}
