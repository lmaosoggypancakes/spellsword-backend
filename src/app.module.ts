import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [ApiModule, UsersModule, AuthenticationModule, AuthorizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
