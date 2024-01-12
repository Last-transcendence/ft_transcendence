import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class ChatRoom {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'ChatRoom destination user id' })
	destId: string;
}

export default ChatRoom;
