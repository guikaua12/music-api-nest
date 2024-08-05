import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserAlreadyExistsException, UserNotFound } from './user.exception';
import { FindByEmailOrUsernameRequest, UserCreateRequest } from './user.dto';
import { PasswordEncoder } from '../auth/password-hasher';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }

  async findByEmailOrUsername({
    email,
    username,
  }: FindByEmailOrUsernameRequest): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });
  }

  async createUser({
    email,
    username,
    name,
    password,
  }: UserCreateRequest): Promise<User> {
    const userExists = await this.findByEmailOrUsername({
      email,
      username,
    });

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    return this.prismaService.user.create({
      data: {
        email,
        username,
        name,
        password: await this.passwordEncoder.hash(password),
      },
    });
  }
}
