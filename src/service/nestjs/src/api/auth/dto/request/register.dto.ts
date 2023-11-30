import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class Register {
	@IsString()
	@IsNotEmpty()
	@Length(3, 4)
	@Trim()
	@ApiProperty({ example: '장정안' })
	name: string;

	@IsString()
	@IsNotEmpty()
	@Length(4, 20)
	@Trim()
	@ApiProperty({ example: 'jhanks1221', uniqueItems: true })
	id: string;

	@IsString()
	@IsNotEmpty()
	@Length(8, 20)
	@Trim()
	@ApiProperty({ example: 'P@55w0rd!' })
	password: string;

	@IsEmail()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: 'inetty@kookmin.ac.kr', required: false, uniqueItems: true })
	email: string;
}
