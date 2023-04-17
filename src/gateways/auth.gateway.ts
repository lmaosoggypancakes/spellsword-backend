import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

const authService = new AuthService(
  new UsersService(new PrismaService()),
  new JwtService(),
);

export const AuthenticatedWebSocketGateway = (namespace) =>
  WebSocketGateway({
    cors: '*:*',
    namespace,
    allowRequest: async (
      _req: any,
      callback: (arg0: any, arg1: boolean) => void,
    ) => {
      console.log(_req);
      console.log(_req.cookies);
      const user = true;

      if (!user) {
        return callback('Invalid credentials.', false);
      }
      callback(null, true);
    },
  });
