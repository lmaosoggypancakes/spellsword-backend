import { Injectable } from '@nestjs/common';
import { User, Game, GameStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { generateRandomSequence } from 'src/util/words';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async createGame(...users: User[]): Promise<Game> {
    return await this.prisma.game.create({
      data: {
        status: GameStatus.IN_PROGRESS,
        players: {
          connect: users.map((user) => {
            return { id: user.id };
          }),
        },
        moves: { create: [] },
        characters: generateRandomSequence(),
      },
    });
  }
}
