import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/models';
import { UsersService } from 'src/users/users.service';
import { ApiService } from './api.service';
@Controller('api')
export class ApiController {
  constructor(
    private usersService: UsersService,
    private apiService: ApiService,
  ) {}
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.users({});
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.user({ id });
  }

  @Post('users')
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.apiService.createUser({
      ...(data as Prisma.UserCreateInput),
    });
  }
}
