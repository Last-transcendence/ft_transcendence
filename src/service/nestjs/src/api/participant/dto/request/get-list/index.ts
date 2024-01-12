import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class GetList {
	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({ description: 'Channel ID' })
	channelId: string;
}

export default GetList;
