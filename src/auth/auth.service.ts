import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ username });
    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { password, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string, isWs = false): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersService.user({
        id: payload.id,
      });

      if (!user) {
        if (isWs) {
          return null;
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return user;
    } catch (err: any) {
      if (isWs) {
        return null;
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
