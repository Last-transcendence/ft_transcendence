import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetList {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;
}
