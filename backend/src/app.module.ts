import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import configuration from './config/configuration';

const configModule = ConfigModule.forRoot({
  load: [configuration],
});
const configDatabase = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('DATABASE_HOST'),
  }),
  inject: [ConfigService],
});

@Module({
  imports: [configModule, configDatabase, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
