import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetList {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'Channel ID' })
	channelId: string;
}
