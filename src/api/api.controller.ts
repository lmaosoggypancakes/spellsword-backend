import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
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

  @Get('users/:username')
  async getUser(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.user({ username });
    if (!user) {
      throw new NotFoundException(
        'User with username ' + username + ' not found.',
      );
    }
    return user;
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
}
