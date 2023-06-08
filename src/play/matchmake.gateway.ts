import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'net';
import { AuthService } from 'src/auth/auth.service';
import { Difficulty, User } from '@prisma/client';
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
  @WebSocketServer()
  server: Server;
  users = {
    [Difficulty.ADVENTURE]: new Map<Socket, User>(),
    [Difficulty.CASUAL]: new Map<Socket, User>(),
    [Difficulty.MASTER]: new Map<Socket, User>(),
  };
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
    const difficulty: Difficulty = client.handshake.auth.difficulty;
    if (!Object.values(Difficulty).includes(difficulty)) {
      client.emit('error', 'Invalid difficulty.');
      client.disconnect(true);
      return;
    }

    client.emit('welcome', {
      message: `Hello, ${user.username}!`,
    });
    const pool = this.users[difficulty];
    pool.set(client, user);
    if (pool.size == 2) {
      const newGame = await this.gameService.createGame(
        difficulty,
        ...pool.values(),
      );

      this.server.emit('match', {
        message: 'You have been matched!',
        id: newGame.id,
      });

      // cleanup

      for (const s of pool.keys()) {
        s.disconnect(true);
      }
      pool.clear();
    }
  }

  handleDisconnect(client: Socket) {
    const difficulty: Difficulty = client.handshake.auth.difficulty;
    const pool = this.users[difficulty];
    if (!pool) return;
    pool.delete(client);

    this.server.emit('users-changed', {
      event: 'left',
    });
  }
}
