import { Module } from '@nestjs/common';
import { MatchmakeGateway } from './play.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { GamesModule } from 'src/games/games.module';

@Module({
  providers: [MatchmakeGateway],
  imports: [AuthModule, GamesModule],
})
export class PlayModule {}
