import { Injectable } from '@nestjs/common';
import { CreateAlbumRequest } from './album.dto';
import { Album, Song, User } from '@prisma/client';
import { Express } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumNotFoundException, NoFilesException } from './album.exception';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(user: User, { name }: CreateAlbumRequest): Promise<Album> {
    return this.prisma.album.create({
      data: {
        name,
        artist: { connect: { id: user.id } },
      },
    });
  }

  async uploadSongs(
    albumId: number,
    files: Array<Express.Multer.File>,
  ): Promise<Song[]> {
    if (files?.length < 1) {
      throw new NoFilesException();
    }

    const album = await this.prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new AlbumNotFoundException();
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => this.s3Service.upload(file)),
    );

    return this.prisma.song.createManyAndReturn({
      data: uploadedFiles.map((result) => ({
        albumId,
        name: result.name,
        filename: result.bucketFilename,
      })),
    });
  }
}
