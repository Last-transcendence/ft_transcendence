import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsValidPassword } from 'api/channel/decorator/is-valid-password.decorator';

export class Create {
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

	@IsString()
	@IsValidPassword()
	@Trim()
	@ApiProperty({ description: 'Channel password' })
	password: string;
}
