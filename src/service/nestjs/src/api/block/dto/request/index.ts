import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Create {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Blocked user id' })
	blockedId: string;
}
