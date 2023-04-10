import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'net';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';
@UseGuards(JwtAuthGuard)
@WebSocketGateway(8001, { cors: '*:*' })
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private authService: AuthService) {}
  users = new Map<string, User>();
  async handleConnection(client: Socket, ...args: any[]) {
    console.log('connection!');
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

    this.users.set(client.id, user);
    if (this.users.size == 2) {
      const users = [];
      for (let u of this.users.values()) {
        users.push(u.username);
      }
      client.emit('match', {
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
