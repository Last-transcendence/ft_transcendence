import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Mute {
	@IsString()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'User id' })
	userId: string;
}

export default Mute;
