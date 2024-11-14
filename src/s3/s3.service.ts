import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FileUploadResult } from './s3.dto';
import { v4 as uuid } from 'uuid';
import { getTitleMetadata } from '../util/file.util';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private config: ConfigService) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: config.getOrThrow('AMAZON_S3_ENDPOINT'),
      credentials: {
        accessKeyId: config.getOrThrow('AMAZON_S3_ACCESS_KEY'),
        secretAccessKey: config.getOrThrow('AMAZON_S3_SECRET_KEY'),
      },
    });

    this.bucket = config.getOrThrow<string>('AMAZON_S3_BUCKET');
  }

  async upload(file: Express.Multer.File): Promise<FileUploadResult> {
    const bucketFilename = `${file.originalname}-${uuid()}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: bucketFilename,
      ContentType: file.mimetype,
      Body: file.buffer,
    });

    await this.s3Client.send(command);

    return {
      name: (await getTitleMetadata(file)) || file.filename,
      bucketFilename,
    };
  }
}
