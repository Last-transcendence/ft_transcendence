import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

class Invite {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'ChatRoom destination user id' })
	destId: string;

	@IsUUID()
	@IsNotEmpty()
	@Trim()
    @ApiProperty({ description: 'ChatRoom message' })
    channelId: string;
}

export default Invite;
