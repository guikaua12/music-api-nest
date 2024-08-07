import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './common/zod/zod.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodExceptionFilter());

  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
