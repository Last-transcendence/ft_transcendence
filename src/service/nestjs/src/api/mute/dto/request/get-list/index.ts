import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetList {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;
}
