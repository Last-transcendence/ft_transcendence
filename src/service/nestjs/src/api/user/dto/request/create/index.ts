import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Create {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Nickname' })
	nickname: string;

	@IsOptional()
	@Trim()
	@ApiProperty({ description: 'Use 2FA' })
	use2fa: boolean;

	@IsOptional()
	@IsEmail()
	@Trim()
	@ApiProperty({ description: 'Email used to 2fa', required: false })
	email2fa?: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Profile image URI', required: false })
	profileImageURI?: string;
}

export default Create;
