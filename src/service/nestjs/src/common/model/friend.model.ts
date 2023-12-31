import { ApiProperty } from '@nestjs/swagger';
import { Friend } from '@prisma/client';

class FriendModel implements Friend {
	@ApiProperty({ description: 'Friend id generated by database' })
	id: string;

	@ApiProperty({ description: 'User id' })
	userId: string;

	@ApiProperty({ description: 'Friend id' })
	friendId: string;

	@ApiProperty({ required: false })
	createdAt: Date;

	@ApiProperty({ required: false })
	updatedAt: Date;
}

export default FriendModel;
