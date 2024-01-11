import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getFetcher } from '@/service/api';

const useFetchData = <T>(
	url: string | null,
): { isLoading: boolean; data: T | null; error: AxiosError | null } => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AxiosError | null>(null);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			try {
				setIsLoading(true);
				const res = await getFetcher<T>(url);
				setData(res);
			} catch (err) {
				setError(err as AxiosError);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, isLoading, error };
};

export default useFetchData;
