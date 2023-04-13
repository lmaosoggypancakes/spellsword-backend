import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [UsersModule, AuthModule, GamesModule],
})
export class ApiModule {}
