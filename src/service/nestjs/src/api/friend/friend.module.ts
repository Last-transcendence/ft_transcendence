import { Module } from '@nestjs/common';
import FriendController from './friend.controller';
import FriendService from './friend.service';

@Module({
	controllers: [FriendController],
	providers: [FriendService],
})
class FriendModule {}

export default FriendModule;
