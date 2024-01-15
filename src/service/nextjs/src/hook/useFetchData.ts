import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getFetcher } from '@/service/api';

const useFetchData = <T>(
	url: string | null,
): {
	isLoading: boolean;
	data: T | undefined;
	error: AxiosError | undefined;
	refetch: () => void;
} => {
	const [data, setData] = useState<T | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>(undefined);

	const fetchData = async () => {
		if (!url) return;
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

	useEffect(() => {
		fetchData();
	}, [url]);

	const refetch = () => {
		fetchData();
	};

	return { data, isLoading, error, refetch };
};

export default useFetchData;
