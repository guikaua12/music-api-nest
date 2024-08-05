import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from './auth.dto';
import { AuthService } from './auth.service';
import { UserCreateRequest } from '../users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: UserCreateRequest) {
    return this.authService.register(dto);
  }
}
