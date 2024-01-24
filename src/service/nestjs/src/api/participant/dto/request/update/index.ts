import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString } from 'class-validator';

class Update {
	@Trim()
	@ApiProperty({ description: 'Participant role' })
	role?: $Enums.ParticipantRole;

	@IsString()
	@Trim()
	@ApiProperty({ description: 'Participant socket id' })
	socketId?: string;
}

export default Update;
