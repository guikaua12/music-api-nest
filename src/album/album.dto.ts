import { z } from 'zod';

export const CreateAlbumRequestSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name must have at least 1 character')
    .max(255, 'Name must have at most 255 characters'),
});

export type CreateAlbumRequest = z.infer<typeof CreateAlbumRequestSchema>;
