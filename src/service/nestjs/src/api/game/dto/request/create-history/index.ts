import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

class CreateHistory {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Player 2 id' })
	player2Id: string;

	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Game mode' })
	mode: $Enums.GameMode;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Player 1 score' })
	player1Score: number;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Player 2 score' })
	player2Score: number;

	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Game result' })
	result: $Enums.GameResult;
}

export default CreateHistory;
