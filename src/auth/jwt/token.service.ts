import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../user/user.payload';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken({ id, email, username }: User) {
    return this.jwtService.signAsync({
      sub: id,
      email,
      username,
    } as UserPayload);
  }
}
