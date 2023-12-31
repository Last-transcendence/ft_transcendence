/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	...nextConfig,
	transpilePackages: ['@ion-phaser/react'],
};
