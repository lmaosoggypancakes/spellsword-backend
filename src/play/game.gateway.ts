import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Game, User, Prisma } from '@prisma/client';
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
      game,
    });
    await socket.join(game.id);
    this.server.to(game.id).emit('player-joined', {
      user,
    });

    const roomLength = (await this.server.to(game.id).fetchSockets()).length;
    console.log(roomLength);
    if (roomLength == 2) {
      this.server.to(game.id).emit('ready', {
        message: 'all users joined!',
      });
      socket.emit('your-turn');
    }
  }
  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: Socket) {
    this.server.emit('users-changed', {
      event: 'left',
    });
    socket.rooms.forEach((room) => {
      socket.leave(room);
      console.log(`socket ${socket.id} left room ${room}`);
    });
  }

  @SubscribeMessage('moves')
  async handleGameMoveOrEvent(
    @MessageBody() data: Prisma.MoveUncheckedCreateInput,
  ) {
    console.log(data.gameId);
    try {
      // this.gameService.makeMove(data.);
      this.server.to(data.gameId).emit('new-move', {
        data,
      });
    } catch (err) {
      throw new WsException(<string>err);
    }
  }
}
