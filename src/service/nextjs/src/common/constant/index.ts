export const ROUTE_PATH = {
	ROOT: '/',

	LOGIN: '/auth/login',
	TFA: '/auth/2fa',
	REGISTER: '/auth/register',
} as const;

export const API_PATH = {
	ROOT: '/',

	USER: '/user',
	USER_ME: '/user/me',

	FRIEND: '/friend',
	BLOCK: '/block',
} as const;

export const DEFAULT_PROFILE_IMAGE_URI = 'https://via.placeholder.com/150';
export const LOADING_PROFILE_IMAGE_URI = 'https://via.placeholder.com/150?text=Loading...';
export const UNKNOWN_PROFILE_IMAGE_URI = '/unknown_user.png';
