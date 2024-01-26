import { Typography, Box } from '@mui/material';
import { deleteFetcher } from '@/service/api';
import CustomSnackbar from '@/component/common/CustomSnackbar';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/auth.context';

const MyProfileMenu = () => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { setMe } = useContext(AuthContext);
	const router = useRouter();

	const setCursorStyle = () => ({
		cursor: loading ? 'wait' : 'pointer',
	});

	const onClick = async () => {
		try {
			if (loading === true) return;
			setLoading(true);
			deleteFetcher('/auth/logout');
			setTimeout(() => {
				setMe(null);
			}, 100);
			router.push('/auth/login');
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSnackbarClose = () => {
		setErrorMessage('');
	};

	return (
		<Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={3}>
			<CustomSnackbar
				open={errorMessage === '' ? false : true}
				onClose={handleSnackbarClose}
				success={false}
			>
				{errorMessage}
			</CustomSnackbar>
			<Typography variant="h6">내 정보</Typography>
			<Typography variant="body2" color="orange" onClick={onClick} style={setCursorStyle()}>
				로그아웃
			</Typography>
		</Box>
	);
};

export default MyProfileMenu;
