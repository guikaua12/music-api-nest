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

  async find({
    id,
    email,
    username,
  }: FindByEmailOrUsernameRequest): Promise<User | null> {
    const conditions = [];

    if (id) conditions.push({ id });
    if (email) conditions.push({ email });
    if (username) conditions.push({ username });

    if (conditions.length === 0) {
      throw new Error(
        'At least one property need to be defined (id, email, username)',
      );
    }

    return this.prismaService.user.findFirst({
      where: {
        OR: conditions,
      },
    });
  }

  async createUser({
    email,
    username,
    name,
    password,
  }: UserCreateRequest): Promise<User> {
    const userExists = await this.find({
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
