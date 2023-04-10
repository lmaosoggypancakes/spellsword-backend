import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const type = context.getType();
    if (type === 'http') {
      return context.switchToHttp().getRequest();
    } else if (type === 'ws') {
      const ctx = context.switchToWs().getClient();
      return ctx.handshake;
    } else {
      throw new Error(`This guard was not made for ${type} requests`);
    }
  }
}
