/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://nestjs:3000/:path*',
			},
		];
	},
};

module.exports = {
	...nextConfig,
	transpilePackages: ['@ion-phaser/react'],
};
