import { Controller, Delete, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import TestService from './test.service';

@Controller('test')
@ApiTags('test')
class TestController {
	constructor(private readonly testService: TestService) {}

	@Delete('channel')
	@ApiOperation({ summary: 'Delete all channels' })
	@ApiOkResponse({ description: 'All channels deleted successfully' })
	@ApiNotFoundResponse({ description: 'No channels found to delete' })
	async deleteAllChannel() {
		return this.testService.deleteAllChannel();
	}

	@Delete('user')
	@ApiOperation({ summary: 'Delete all users' })
	@ApiOkResponse({ description: 'All users deleted successfully' })
	@ApiNotFoundResponse({ description: 'No users found to delete' })
	async deleteAllUser() {
		return this.testService.deleteAllUser();
	}
}

export default TestController;
