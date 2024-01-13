import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
	[...Array.from(Array(30).keys())].forEach(async item => {
		await client.user.create({
			data: {
				intraId: `test${item}`,
				nickname: `test${item}`,
				use2fa: true,
				email2fa: `test${item}@student.42seoul.kr`,
				profileImageURI: `https://cdn.intra.42.fr/users/test${item}.jpg`,
				status: 'OFFLINE',
			},
		});
	});
}

main()
	.catch(error => {
		console.error(error);
	})
	.finally(async () => {
		await client.$disconnect();
	});
