import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  
  await app.listen(port, () => {
    Logger.log(`[API - GATEWAY] Service is running on port: ${port}`);
  });

  // const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);

  // const localPort = configService.get<number>('PORT', 3000);
  // const authServiceHost = configService.get<string>(
  //   'AUTH_SERVICE_HOST',
  //   '127.0.0.1',
  // );
  // const authServicePort = configService.get<number>('AUTH_SERVICE_PORT', 3001);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     host: authServiceHost,
  //     port: authServicePort,
  //   },
  // });

  // app.enableCors({
  //   origin: true,
  //   credentials: true,
  // });

  // app.useGlobalPipes(new ValidationPipe());

  // await app.startAllMicroservices();
  // await app.listen(localPort, () => {
  //   Logger.log(`[API - GATEWAY] Service is running on port: ${localPort}`);
  // });
}
bootstrap();
