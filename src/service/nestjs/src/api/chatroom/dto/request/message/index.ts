import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

class ChatRoom {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'ChatRoom destination user id' })
	destId: string;

    @IsString()
    @ApiProperty({ description: 'ChatRoom message' })
    message: string;
}

export default ChatRoom;
