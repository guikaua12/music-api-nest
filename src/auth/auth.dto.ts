import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export type LoginResponse = {
  token: string;
};
