import axios from 'axios';
// import CookieLoader from './cookieLoader';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	// headers: {
	// 	Authorization: `Bearer ${CookieLoader()}`,
	// },
});

export default axiosInstance;
