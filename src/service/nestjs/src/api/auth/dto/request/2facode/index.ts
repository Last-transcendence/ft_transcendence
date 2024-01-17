import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class TwoFaCode {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'code' })
	twoFaCode: string;
}

export default TwoFaCode;
