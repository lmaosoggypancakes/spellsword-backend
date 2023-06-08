import { Injectable } from '@nestjs/common';
import { User, Game, GameStatus, Prisma, Difficulty } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { generateRandomSequence } from 'src/util/words';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async createGame(difficulty: Difficulty, ...users: User[]): Promise<Game> {
    return await this.prisma.game.create({
      data: {
        status: GameStatus.IN_PROGRESS,
        difficulty,
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
        difficulty: true,
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

  async makeMove(move: Prisma.MoveCreateManyInput) {
    return await this.prisma.move.create({ data: { ...move } });
  }

  async gameOver(gameId: string, winnerId: string) {
    return this.prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        winnerId,
        status: GameStatus.ENDED,
      },
    });
  }

  async getUserGames(id: string) {
    return await this.prisma.game.findMany({
      where: {
        players: {
          some: {
            id,
          },
        },
      },
      select: {
        timestamp: true,
        characters: true,
        moves: {
          select: {
            points: true,
            userId: true,
          },
        },
        players: {
          select: {
            username: true,
            id: true,
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
