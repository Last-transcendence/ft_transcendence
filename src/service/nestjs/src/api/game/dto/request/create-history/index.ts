import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

class CreateHistory {
	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Player 1 id' })
	player1Id: string;

	@IsNotEmpty()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Player 2 id' })
	player2Id: string;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Game mode' })
	mode: $Enums.GameMode;

	@IsNotEmpty()
	@IsNumber()
	@Trim()
	@ApiProperty({ description: 'Player 1 score' })
	player1Score: number;

	@IsNotEmpty()
	@IsNumber()
	@Trim()
	@ApiProperty({ description: 'Player 2 score' })
	player2Score: number;

	@IsNotEmpty()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Game result' })
	result: $Enums.GameResult;
}

export default CreateHistory;
