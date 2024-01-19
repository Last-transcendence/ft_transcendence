import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface CustomSnackbarProps {
	open: boolean;
	onClose: () => void;
	message: string;
	success: boolean;
	position?: 'top' | 'bottom';
	horizontal?: 'left' | 'center' | 'right';
}

const PositionableSnackbar = ({
	open,
	onClose,
	message,
	success,
	position,
	horizontal,
}: CustomSnackbarProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={1000}
			onClose={onClose}
			sx={{ width: '100%' }}
			anchorOrigin={{ vertical: position ?? 'top', horizontal: horizontal ?? 'right' }}
		>
			<MuiAlert variant="filled" severity={success ? 'success' : 'error'} onClose={onClose}>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default PositionableSnackbar;
