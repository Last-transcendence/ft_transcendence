import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/client';

class Create {
	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Channel id' })
	channelId: string;

	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'User id' })
	userId: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Socket id' })
	socketId: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Role' })
	role?: $Enums.ParticipantRole = 'USER';
}

export default Create;
