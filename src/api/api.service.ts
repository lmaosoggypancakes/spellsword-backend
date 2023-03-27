import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models';
import { UsersService } from 'src/users/users.service';
import { hash } from 'bcrypt';
import { Prisma, User } from '@prisma/client';
@Injectable()
export class ApiService {
  constructor(private usersService: UsersService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    data.password = await hash(data.password, 10);
    return await this.usersService.createUser(data as Prisma.UserCreateInput);
  }
}
