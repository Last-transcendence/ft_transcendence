import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

export class User {
	@ApiProperty({ description: 'User id generated by database' })
	id: string;

	@ApiProperty({ description: 'Nickname', example: 'younhwan' })
	nickname: string;

	@ApiProperty({ description: 'Profile image URI', nullable: true })
	profileImageURI: string;

	@ApiProperty({
		description: 'Status of user',
		example: 'OFFLINE',
		default: UserStatus.OFFLINE,
	})
	status: UserStatus;
}
