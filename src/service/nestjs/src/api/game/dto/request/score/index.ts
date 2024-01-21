import { IsNotEmpty, IsNumber } from 'class-validator';
import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import Room from '../room';

class Score extends Room {
	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Score' })
	score: string;
}

export default Score;
