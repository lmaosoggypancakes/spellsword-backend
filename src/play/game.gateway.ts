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
import { User, Prisma } from '@prisma/client';
import { GamesService } from 'src/games/games.service';

@WebSocketGateway({
  cors: '*:*',
  namespace: 'play',
  transports: ['websocket'],
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    private authService: AuthService,
    private gameService: GamesService,
  ) {}
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
    const gameId = socket.handshake.auth.id;

    const game = await this.gameService.getGameById(<string>gameId);

    socket.emit('welcome', {
      message: `Hello, ${user.username!}`,
      game,
    });

    await socket.join(game.id);
    this.server.to(game.id).emit('player-joined', {
      user,
    });

    const roomLength = (await this.server.to(game.id).fetchSockets()).length;
    if (roomLength >= 2) {
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
    });
  }

  @SubscribeMessage('moves')
  async handleGameMoveOrEvent(
    @MessageBody()
    data: Prisma.MoveCreateManyInput,
  ) {
    try {
      const newMove = await this.gameService.makeMove(data);
      this.server.to(data.gameId).emit('new-move', {
        data,
      });
    } catch (err) {
      throw new WsException(<string>err);
    }
  }
}
