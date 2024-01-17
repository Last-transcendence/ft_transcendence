import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import FtStrategy from './ft.strategy';
import UserStrategy from './user.strategy';
import UserWsStrategy from './user-ws.strategy';
import UserModule from 'api/user/user.module';

@Module({
	imports: [UserModule, PassportModule],
	providers: [FtStrategy, UserStrategy, UserWsStrategy],
})
class JwtAuthModule {}

export default JwtAuthModule;
