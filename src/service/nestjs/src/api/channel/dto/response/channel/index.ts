import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class Channel {
	@ApiProperty({ description: 'Channel id' })
	id: string;

	@ApiProperty({ description: 'Channel title' })
	title: string;

	@ApiProperty({ description: 'Channel visibility range.' })
	visibility: $Enums.ChannelVisibility;
}
