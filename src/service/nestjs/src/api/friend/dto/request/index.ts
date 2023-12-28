import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Friend {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Friend id' })
	friendId: string;
}
