import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  await app.startAllMicroservices();
  await app
    .listen(3001)
    .then(() =>
      Logger.log('[AUTH SERVICE] - Microservice is listening', 'Microservice'),
    )
    .catch((error) => Logger.error(error, 'Microservice'));
}
bootstrap();
