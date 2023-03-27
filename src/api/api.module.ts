import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [UsersModule],
})
export class ApiModule {}
