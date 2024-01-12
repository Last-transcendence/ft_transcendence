import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Create {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Destination user id' })
	destId: string;

	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Message' })
	content: string;
}

export default Create;
