import api from '@/component/api/base';

export const getFetcher = (url: string) =>
	api
		.get(url)
		.then(res => res.data)
		.catch(error => {
			throw error;
		});
