import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class Friend {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Friend id' })
	friendId: string;
}
