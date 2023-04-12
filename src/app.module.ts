import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiModule } from './api/api.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchmakeGateway } from './play/play.gateway';
import { ConfigModule } from '@nestjs/config';
import { PlayModule } from './play/play.module';
import { GamesModule } from './games/games.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    UsersModule,
    AuthModule,
    PlayModule,
    GamesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
