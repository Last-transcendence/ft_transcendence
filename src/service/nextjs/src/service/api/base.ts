import axios from 'axios';
// import CookieLoader from './cookieLoader';

const axiosInstance = axios.create({
	baseURL: '/api',
	timeout: 5000,
	withCredentials: true,
});

export default axiosInstance;
