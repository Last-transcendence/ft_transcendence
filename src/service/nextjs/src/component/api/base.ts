import axios from 'axios';
// import CookieLoader from './cookieLoader';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	withCredentials: true,
	// headers: {
	// 	Authorization: `Bearer ${CookieLoader()}`,
	// },
});

export default api;
