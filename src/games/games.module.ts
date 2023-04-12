import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [GamesService, PrismaService],
  exports: [GamesService],
})
export class GamesModule {}
