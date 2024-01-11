import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Create {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'User id' })
	userId: string;
}
