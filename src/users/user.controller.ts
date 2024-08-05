import { Controller, Get } from '@nestjs/common';
import { UserWithoutPassword } from './user.dto';
import { AuthenticatedUser, ProtectedRoute } from '../auth/user/user.decorator';

@Controller('users')
export class UserController {
  @ProtectedRoute()
  @Get('me')
  async me(@AuthenticatedUser() user: UserWithoutPassword) {
    return user;
  }
}
