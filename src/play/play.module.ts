import { Module } from '@nestjs/common';
import { MatchmakeGateway } from './matchmake.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { GamesModule } from 'src/games/games.module';
import { GameGateway } from './game.gateway';

@Module({
  providers: [MatchmakeGateway, GameGateway],
  imports: [AuthModule, GamesModule],
})
export class PlayModule {}
