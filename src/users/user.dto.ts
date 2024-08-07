import { User } from '@prisma/client';
import { z } from 'zod';

export const UserCreateRequestSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, 'Name must have at least 3 characters')
    .max(16, 'Name must have at most 16 characters'),
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must have at least 3 characters')
    .max(255, 'Name must have at most 3 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(255, 'Password must have at most 255 characters'),
});

export type UserCreateRequest = z.infer<typeof UserCreateRequestSchema>;

export type FindByEmailOrUsernameRequest = {
  id?: number;
  email?: string;
  username?: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;
