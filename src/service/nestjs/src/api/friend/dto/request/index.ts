import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class FriendRequestDto {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Friend id' })
	friendId: string;
}

export default FriendRequestDto;
