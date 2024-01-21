import { IsNotEmpty, IsNumber } from 'class-validator';
import Room from '../room';
import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';

class Score extends Room {
	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Score' })
	score: number;
}

export default Score;
