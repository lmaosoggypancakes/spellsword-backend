import { Module } from '@nestjs/common';
import { GameGateway } from './play.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GameGateway],
  imports: [AuthModule],
})
export class PlayModule {}
