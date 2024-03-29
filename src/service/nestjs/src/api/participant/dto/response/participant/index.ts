import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class Participant {
	@ApiProperty({ description: 'Participant id generated by database' })
	id: string;

	@ApiProperty({ description: 'Channel uuid' })
	channelId: string;

	@ApiProperty({ description: 'Participant role' })
	role: $Enums.ParticipantRole;

	@ApiProperty({ description: 'User uuid' })
	userId: string;

	@ApiProperty({ description: 'Socket id' })
	socketId: string;

	@ApiProperty({ description: 'User nickname' })
	nickname?: string | null;

	@ApiProperty({ description: 'User profile image uri' })
	profileImageURI?: string | null;
}
