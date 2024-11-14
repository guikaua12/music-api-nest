import { BadRequestException, NotFoundException } from '@nestjs/common';

export class NoFilesException extends BadRequestException {
  constructor() {
    super('No files provided', 'NO_FILES_PROVIDED');
  }
}

export class AlbumNotFoundException extends NotFoundException {
  constructor() {
    super('Album not found', 'ALBUM_NOT_FOUND');
  }
}
