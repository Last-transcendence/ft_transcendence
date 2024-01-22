import { IsNotEmpty, IsNumber } from 'class-validator';
import Room from '../room';
import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';

class Ball extends Room {
	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'x position of ball' })
	x: number;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'y position of ball' })
	y: number;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'x velocity of ball' })
	velocityX: number;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'y velocity of ball' })
	velocityY: number;
}

export default Ball;
