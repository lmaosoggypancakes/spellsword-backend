import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'net';
import { AuthService } from 'src/auth/auth.service';
import { Game, Move, User } from '@prisma/client';
import { GamesService } from 'src/games/games.service';

@WebSocketGateway({
  cors: '*:*',
  namespace: 'play',
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    private authService: AuthService,
    private gameService: GamesService,
  ) {}
  games = new Map<Game, Socket[]>();
  async handleConnection(socket: Socket, ...args: any[]) {
    const user: User = await this.authService.verify(
      socket.handshake.auth.token,
      true,
    );
    if (!user) {
      socket.emit('error', 'Invalid credentials.');
      socket.disconnect(true);
      return;
    }
    const gameId = socket.handshake.query.id;
    const game = await this.gameService.getGameById(<string>gameId);

    if (this.games.has(game)) {
      this.games.set(game, [...this.games.get(game), socket]);
    }
    socket.emit('welcome', {
      message: `Hello, ${user.username!}`,
      game: game,
    });
    socket.join(game.id);
    socket.to(game.id).emit('player-joined', {
      user,
    });

    if (socket.rooms[game.id].length == 2) {
      socket.to(game.id).emit('ready', {
        message: 'all players have joined!',
      });
    }
  }
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.server.emit('users-changed', {
      event: 'left',
    });
  }

  @SubscribeMessage('moves')
  async handleGameMoveOrEvent(
    @MessageBody() data: Move,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const newMove = await this.gameService.makeMove(data);
      socket.to(newMove.gameId).emit('new-move', {
        data: newMove,
      });
    } catch (err) {
      throw new WsException(<string>err);
    }
  }
}
