import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiModule } from './api/api.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GameGateway } from './gateways/play.gateway';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), ApiModule, UsersModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    GameGateway,
  ],
})
export class AppModule {}
