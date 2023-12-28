import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface CustomSnackbarProps {
	open: boolean;
	onClose: () => void;
	message: string;
	success: boolean;
}

const CustomSnackbar = ({ open, onClose, message, success }: CustomSnackbarProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={1000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<MuiAlert variant="filled" severity={success ? 'success' : 'error'} onClose={onClose}>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default CustomSnackbar;
