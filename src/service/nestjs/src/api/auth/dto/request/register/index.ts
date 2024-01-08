import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class Register {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Nickname' })
	nickname: string;

	@IsBoolean()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Use 2FA' })
	use2fa: boolean;

	@IsBoolean()
	@Trim()
	@ApiProperty({ description: 'Email used to 2fa' })
	email2fa: string;

	@IsString()
	@Trim()
	@ApiProperty({ description: 'Profile image URI' })
	profileImageURI: string;
}

export default Register;
