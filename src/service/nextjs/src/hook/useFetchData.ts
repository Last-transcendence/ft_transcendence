import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getFetcher } from '@/service/api';

const useFetchData = <T>(
	url: string | null,
): { isLoading: boolean; data: T | undefined; error: AxiosError | undefined } => {
	const [data, setData] = useState<T | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>(undefined);

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
