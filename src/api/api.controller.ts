import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/models';
import { UsersService } from 'src/users/users.service';
import { ApiService } from './api.service';
@Controller('api')
export class ApiController {
  constructor(
    private usersService: UsersService,
    private apiService: ApiService,
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
}
