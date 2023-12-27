import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatRoom {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'ChatRoom destination user id' })
	destId: string;
}

export class Chat {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Destination user id' })
	destId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Message' })
	content: string;
}
