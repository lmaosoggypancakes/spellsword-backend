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
import { GamesService } from 'src/games/games.service';

@WebSocketGateway({
  cors: '*:*',
  namespace: 'matchmake',
})
export class MatchmakeGateway
  implements OnGatewayDisconnect, OnGatewayConnection
{
  constructor(
    private authService: AuthService,
    private gameService: GamesService,
  ) {}
  users = new Map<Socket, User>();
  async handleConnection(client: Socket, ...args: any[]) {
    console.log('user connected');
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
      console.log('match found!!!');
      const newGame = await this.gameService.createGame(...this.users.values());

      this.server.emit('match', {
        message: 'You have been matched!',
        id: newGame.id,
      });

      // cleanup

      for (const s of this.users.keys()) {
        s.disconnect(true);
      }
      this.users.clear();
    }
  }
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.users.delete(client);
    this.server.emit('users-changed', {
      event: 'left',
    });
  }
}
