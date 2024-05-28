import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import merkle  from 'merkle';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }))
  await app.listen(3000);
}
bootstrap();
