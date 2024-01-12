import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class Create {
	@IsUUID()
	@IsNotEmpty()
	@Trim()
	@ApiProperty({ description: 'Blocked user id' })
	blockedId: string;
}

export default Create;
