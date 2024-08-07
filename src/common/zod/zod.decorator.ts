import { Body } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodPipe } from './zod.pipe';

export const ValidBody = (schema: ZodSchema) => {
  return Body(new ZodPipe(schema));
};
