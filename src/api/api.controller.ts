import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Game, Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateUserDto } from 'src/models';
import { UsersService } from 'src/users/users.service';
import { ApiService } from './api.service';
import { GamesService } from 'src/games/games.service';
@Controller('api')
export class ApiController {
  constructor(
    private usersService: UsersService,
    private apiService: ApiService,
    private gameService: GamesService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.users({});
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.user({ id });
    if (!user) {
      throw new NotFoundException('User with id ' + id + ' not found.');
    }
    return user;
  }

  @Get('users/:id/games')
  async getUserGames(@Param('id') id: string) {
    return await this.gameService.getUserGames(id);
  }
  @Post('users')
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.apiService.createUser({
      ...(data as Prisma.UserCreateInput),
    });
  }

  @Get('games/:id')
  async getGame(@Param('id') id: string): Promise<Game> {
    return await this.gameService.getGameById(id);
  }

  @Put('users/:id')
  async updateUsers(@Param('id') id: string, @Body() data): Promise<User> {
    return this.usersService.updateUser({
      where: {
        id,
      },
      data,
    });
  }

  @Put('games/:id/game_over')
  async markGameAsOver(@Param('id') id: string, @Body() data): Promise<Game> {
    return this.gameService.gameOver(id, data.winner_id);
  }
}
