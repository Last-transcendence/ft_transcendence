import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FtJwtAuthStrategy } from './jwtauth.strategy';

@Module({
    imports: [PassportModule],
    providers: [FtJwtAuthStrategy],
})
export class FtAuthModule {}
