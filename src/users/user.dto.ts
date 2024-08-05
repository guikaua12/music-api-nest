import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';
import { User } from '@prisma/client';

export class UserCreateRequest {
  @IsEmail()
  email: string;
  @Length(3, 16)
  username: string;
  @MinLength(3)
  name: string;
  @IsNotEmpty()
  password: string;
}

export type FindByEmailOrUsernameRequest = {
  id?: number;
  email?: string;
  username?: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;
