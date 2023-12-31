import { ApiProperty } from '@nestjs/swagger';
import { Block } from '@prisma/client';

class BlockModel implements Block {
	@ApiProperty({ description: 'Block id generated by database' })
	id: string;

	@ApiProperty({ description: 'User id' })
	userId: string;

	@ApiProperty({ description: 'Blocked user id' })
	blockedId: string;

	@ApiProperty({ required: false })
	createdAt: Date;

	@ApiProperty({ required: false })
	updatedAt: Date;
}

export default BlockModel;
