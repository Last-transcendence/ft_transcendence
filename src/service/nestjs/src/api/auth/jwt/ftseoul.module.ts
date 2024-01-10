import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FtSeoulStrategy } from './ftseoul.strategy';

@Module({
    imports: [PassportModule],
    providers: [FtSeoulStrategy],
})
export class FtAuthModule {}
