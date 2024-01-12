import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { IsValidPassword } from 'api/channel/decorator/is-valid-password.decorator';

class Create {
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

	@IsString()
	@IsValidPassword()
	@Trim()
	@ApiProperty({ description: 'Channel password' })
	password: string;
}

export default Create;
