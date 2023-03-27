import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('api')
export class ApiController {
  constructor(private usersService: UsersService) {}
  @Get('users')
  async getAllUsers() {
    return await this.usersService.users({});
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.user({ id });
  }
}
