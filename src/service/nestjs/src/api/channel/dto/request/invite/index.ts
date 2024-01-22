import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class Invite {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'User id' })
	userId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Nickname to invite' })
	nickname: string;
}

export default Invite;
