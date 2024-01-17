import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import FtStrategy from './ft.strategy';

@Module({
	imports: [PassportModule],
	providers: [FtStrategy],
})
class FtAuthModule {}

export default FtAuthModule;
