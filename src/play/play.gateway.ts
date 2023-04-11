import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'net';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';
@WebSocketGateway(8001, { cors: '*:*', path: '/matchmake' })
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private authService: AuthService) {}
  users = new Map<Socket, User>();
  async handleConnection(client: Socket, ...args: any[]) {
    const user: User = await this.authService.verify(
      client.handshake.auth.token,
      true,
    );
    if (!user) {
      client.emit('error', 'Invalid credentials.');
      client.disconnect(true);
      return;
    }
    client.emit('welcome', {
      message: `Hello, ${user.username}!`,
    });

    this.users.set(client, user);
    if (this.users.size == 2) {
      const users = [];
      for (let u of this.users.values()) {
        users.push(u.username);
      }

      this.server.emit('match', {
        message: `You have been matched: ${users}`,
      });
    }
  }
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log(`Size: ${this.users.size}`);
    this.server.emit('users-changed', {
      event: 'left',
    });
  }
}
