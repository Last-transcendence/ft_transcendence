import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ChannelVisibility } from '@prisma/client';
import { IsValidPassword } from 'api/channel/decorator/is-valid-password.decorator';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class Channel {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

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

	@IsValidPassword({ message: 'Invalid password format' })
	@Trim()
	@ApiProperty({ description: 'Channel password', required: false })
	password: string | null;
}
