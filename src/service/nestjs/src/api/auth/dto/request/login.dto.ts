import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class Login {
	@IsString()
	@Length(4, 20)
	@Trim()
	@ApiProperty({ example: 'jhanks1221' })
	id: string;

	@IsString()
	@Length(8, 20)
	@Trim()
	@ApiProperty({ example: 'P@55w0rd!' })
	password: string;

	@IsEmail()
	@Trim()
	@ApiProperty({ example: 'inetty@kookmin.ac.kr' })
	email: string;
}
