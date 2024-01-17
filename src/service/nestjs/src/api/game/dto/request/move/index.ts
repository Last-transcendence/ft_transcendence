import { IsNotEmpty, IsNumber } from 'class-validator';
import Room from '../room';
import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';

class Move extends Room {
	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'x coordinate' })
	x: number;
}

export default Move;
