import { Injectable } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class TestService {
	constructor(private readonly prismaService: PrismaService) {}

	async deleteAllChannel() {
		try {
			await this.prismaService.channel.deleteMany();
			return { success: true, message: 'All channels deleted successfully' };
		} catch (error) {
			return { success: false, message: 'No channels found to delete' };
		}
	}

	async deleteAllUser() {
		try {
			await this.prismaService.user.deleteMany();
			return { success: true, message: 'All users deleted successfully' };
		} catch (error) {
			return { success: false, message: 'No users found to delete' };
		}
	}
}
export default TestService;
