import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/client';

class Create {
	@IsOptional()
	@IsUUID()
	@Trim()
	@ApiProperty({ description: 'Player id' })
	userId?: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Socket id' })
	socketId?: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Game mode' })
	mode: $Enums.GameMode;

	@IsOptional()
	@IsString()
	@Trim()
	@ApiProperty({ description: 'Ready' })
	ready?: boolean;

	@IsOptional()
	@IsDate()
	@Trim()
	@ApiProperty({ description: 'UpdatedAt' })
	updatedAt?: Date;
}

export default Create;
