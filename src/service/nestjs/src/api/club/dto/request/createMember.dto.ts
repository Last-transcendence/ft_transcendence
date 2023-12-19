import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMemberDTO {
	@IsNotEmpty()
	@ApiProperty({ description: 'user 정보', example: '6512761c1785e115d886a20e' })
	userId: Types.ObjectId;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'user의 권한', example: '관리자' })
	role: string;

	@IsNotEmpty()
	@ApiProperty({ description: 'user 참여도', example: 0, default: 0 })
	participation: number;
}
