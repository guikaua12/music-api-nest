import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor() {
    super('User not found', 'USER_NOT_FOUND');
  }
}

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User already exists', 'USER_ALREADY_EXISTS');
  }
}
