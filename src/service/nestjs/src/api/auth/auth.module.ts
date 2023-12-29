import { Module, Session } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import UserModule from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { FtSeoulStrategy } from './jwt/ftseoul.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, PassportModule.register({ session: true, defaultStrategy: 'ft' })],
  providers: [AuthService, FtSeoulStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
