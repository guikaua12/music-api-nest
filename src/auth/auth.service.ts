import { Injectable } from '@nestjs/common';
import { LoginRequest, LoginResponse } from './auth.dto';
import { UserService } from '../users/user.service';
import { InvalidPasswordException } from './auth.exception';
import { TokenService } from './token.service';
import { UserCreateRequest } from '../users/user.dto';
import { PasswordEncoder } from './password-hasher';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async login({
    email,
    password: plainPassword,
  }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);

    const isPasswordValid = await this.passwordEncoder.compare(
      plainPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    return {
      token: await this.tokenService.createToken(user),
    };
  }

  async register(dto: UserCreateRequest): Promise<LoginResponse> {
    const user = await this.userService.createUser(dto);

    return {
      token: await this.tokenService.createToken(user),
    };
  }
}
