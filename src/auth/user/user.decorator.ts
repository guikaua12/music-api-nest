import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from './user.guard';
import { Request } from 'express';
import { UserWithoutPassword } from '../../users/user.dto';

export function ProtectedRoute() {
  return applyDecorators(UseGuards(UserGuard));
}

export const AuthenticatedUser = createParamDecorator<
  unknown,
  ExecutionContext,
  UserWithoutPassword
>((data, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<Request>().user as UserWithoutPassword;
});
