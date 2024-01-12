import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

class Update {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Participant role' })
	role: $Enums.ParticipantRole;
}

export default Update;
