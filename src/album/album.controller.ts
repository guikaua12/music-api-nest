import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedUser, ProtectedRoute } from '../auth/user/user.decorator';
import { ValidBody } from '../common/zod/zod.decorator';
import { CreateAlbumRequest, CreateAlbumRequestSchema } from './album.dto';
import { AlbumService } from './album.service';
import { Song, User } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('create')
  @ProtectedRoute()
  upload(
    @AuthenticatedUser() user: User,
    @ValidBody(CreateAlbumRequestSchema) dto: CreateAlbumRequest,
  ) {
    return this.albumService.create(user, dto);
  }

  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadSongs(
    @Param('id', ParseIntPipe) albumId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Song[]> {
    return this.albumService.uploadSongs(albumId, files);
  }
}
