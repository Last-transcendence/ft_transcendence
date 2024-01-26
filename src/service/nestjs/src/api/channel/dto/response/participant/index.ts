import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/client';

class Participant {
	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Participant id generated by database' })
	id: string;

	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'User id generated by database' })
	userId: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'User role in channel' })
	role: $Enums.ParticipantRole;

	user: {
		nickname: string;
		profileImageURI: string;
	};
}

export default Participant;