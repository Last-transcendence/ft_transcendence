/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dev.transcendence.42seoul.kr',
				pathname: '/upload/**',
			},
		],
	},
	transpilePackages: ['@ion-phaser/react'],
};

module.exports = nextConfig;
