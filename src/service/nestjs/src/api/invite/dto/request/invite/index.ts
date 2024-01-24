import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

class Invite {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'ChatRoom destination user id' })
	destNickname: string;

	@IsUUID()
	@IsNotEmpty()
	@Trim()
    @ApiProperty({ description: 'ChatRoom message' })
    channelId: string;
}

export default Invite;
