import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ReceiptRequestDto {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: '49fafa4d2ca3602935816679' })
	imageId: Types.ObjectId;
}
