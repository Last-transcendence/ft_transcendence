import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ChannelVisibility } from '@prisma/client';
import { IsValidPassword } from 'api/channel/decorator/is-valid-password.decorator';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

class Create {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel title' })
	title: string;

	@IsEnum(ChannelVisibility)
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel visibility range.' })
	visibility: $Enums.ChannelVisibility;

	@IsValidPassword()
	@Trim()
	@ApiProperty({ description: 'Channel password', required: false })
	password: string | null;
}

export default Create;
