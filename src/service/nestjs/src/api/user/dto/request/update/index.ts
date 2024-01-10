import { ApiProperty, PartialType } from '@nestjs/swagger';

export class Update {
	@ApiProperty({ description: 'Nickname', example: 'younhwan' })
	nickname: string;

	@ApiProperty({ description: 'Profile image URI', nullable: true })
	profileImageURI: string;
	
	@ApiProperty({ description: 'email', nullable: true })
	email2fa: string;
}

export class meUpdate extends PartialType(Update) {}