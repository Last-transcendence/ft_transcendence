import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/client';

class Get {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'User id' })
	id: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Nickname' })
	nickname: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Profile image URI' })
	profileImageURI: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Status' })
	status: $Enums.UserStatus;
}

export default Get;
