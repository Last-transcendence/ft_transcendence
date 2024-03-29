import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Channel } from '@prisma/client';

class ChannelModel implements Channel {
	@ApiProperty({ description: 'Channel id generated by database' })
	id: string;

	@ApiProperty({ description: 'Channel title' })
	title: string;

	@ApiProperty({ description: 'Channel visibility' })
	visibility: $Enums.ChannelVisibility;

	@ApiProperty({ description: 'Channel password', required: false })
	password: string | null;

	@ApiProperty({ required: false })
	createdAt: Date;

	@ApiProperty({ required: false })
	updatedAt: Date;
}

export default ChannelModel;
