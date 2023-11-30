import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types, isValidObjectId } from 'mongoose';

export class CreateReviewDTO {
	// @IsMongoId()
	// @IsNotEmpty()
	// @ApiProperty({ example: '650aae123f1ac83686bbd50a' })
	// clubId: Types.ObjectId;

	@IsMongoId()
	@IsNotEmpty()
	@ApiProperty({ example: '6507f4825595aeb9b366f0fd' })
	userId: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ example: '우동 동아리 너무너무 재미써요!' })
	content: string;

	//@IsArray()
	//@ApiProperty({ example: ['#인싸', '#스터디'] })
	//tags: string[];

	@IsNumber()
	@IsIn([0, 1, 2, 3, 4, 5])
	@ApiProperty({ example: 4 })
	rating: number;
}
