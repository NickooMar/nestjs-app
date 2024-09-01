import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env', '.env.development'],
});


@Module({
  imports: [configModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
