import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/auth.context';
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
	const { me } = useContext(AuthContext);

	
	const fetchData = async () => {
		if (!url) return;
		setIsLoading(true);
		getFetcher<T>(url)
			.then(res => setData(res))
			.catch(err => setError(err));
		setIsLoading(false);
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
