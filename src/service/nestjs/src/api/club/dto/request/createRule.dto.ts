import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRuleDTO {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: '규칙' })
	title: string;

	@IsArray()
	@ApiProperty({ example: ['지각시 5만원', '물품 분실시 보관함 확인', '활동 무단 미참여시 제명'] })
	content: string[];
}
