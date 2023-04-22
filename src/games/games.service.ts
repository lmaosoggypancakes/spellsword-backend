import { Injectable } from '@nestjs/common';
import { User, Game, GameStatus, Prisma } from '@prisma/client';
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

  async getGameById(id: string): Promise<Game> {
    return await this.prisma.game.findUnique({
      where: {
        id,
      },
      select: {
        timestamp: true,
        id: true,
        characters: true,
        status: true,
        winnerId: true,
        players: {
          select: {
            username: true,
            picture: true,
          },
        },
      },
    });
  }

  async makeMove(move: Prisma.MoveCreateInput) {
    return await this.prisma.move.create({ data: move });
  }

  async getUserGames(username: string) {
    return await this.prisma.game.findMany({
      where: {
        players: {
          some: {
            username,
          },
        },
      },
      select: {
        timestamp: true,
        moves: {
          select: {
            points: true,
            userId: true,
          },
        },
        id: true,
        winner: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
