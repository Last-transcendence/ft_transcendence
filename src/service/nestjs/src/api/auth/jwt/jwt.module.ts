import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import FtStrategy from './ft.strategy';
import UserStrategy from './user.strategy';

@Module({
	imports: [PassportModule],
	providers: [FtStrategy, UserStrategy],
})
class JwtAuthModule {}

export default JwtAuthModule;
