import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Member } from 'common/database/schema/member.schema';

export class CreateClubDTO {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: '우동' })
	name: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: '우동 맛집 탐방동아리 입니다' })
	description: string;

	@IsString()
	@Trim()
	@ApiProperty({ example: '#인싸' })
	tags: string;
}
