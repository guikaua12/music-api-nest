import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

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
  email: string;
  username: string;
};
