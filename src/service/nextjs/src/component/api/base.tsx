import axios from 'axios';
// import CookieLoader from './cookieLoader';

const api = axios.create({
	baseURL: '',
	timeout: 5000,
	// headers: {
	// 	Authorization: `Bearer ${CookieLoader()}`,
	// },
});

export default api;
