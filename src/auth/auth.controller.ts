import { Controller, Post } from '@nestjs/common';
import { LoginRequest, LoginRequestSchema } from './auth.dto';
import { AuthService } from './auth.service';
import { UserCreateRequest, UserCreateRequestSchema } from '../users/user.dto';
import { ValidBody } from '../common/zod/zod.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@ValidBody(LoginRequestSchema) dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@ValidBody(UserCreateRequestSchema) dto: UserCreateRequest) {
    return this.authService.register(dto);
  }
}
