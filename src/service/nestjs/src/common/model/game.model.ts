import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { Game, $Enums } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

class GameModel implements Game {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Game id generated by database' })
	id: string;

	@IsOptional()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Player id' })
	userId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Socket id' })
	socketId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Game mode' })
	mode: $Enums.GameMode;

	@IsNumber()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Score' })
	score: number;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Ready' })
	ready: boolean;

	@ApiProperty({ required: false })
	createdAt: Date;

	@ApiProperty({ required: false })
	updatedAt: Date;
}

export default GameModel;
