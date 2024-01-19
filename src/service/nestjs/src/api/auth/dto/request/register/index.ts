import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Register {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Nickname' })
	nickname: string;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Use 2FA' })
	use2fa: string;

	@IsOptional()
	@IsEmail()
	@Trim()
	@ApiProperty({ description: 'Email used to 2fa', required: false })
	email2fa?: string;

	@IsOptional()
    @IsString()
    @Trim()
    @ApiProperty({ description: 'Field Name', format: 'binary', required: false })
    file?: string;
}

export default Register;
