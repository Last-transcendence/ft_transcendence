import { ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface CustomSnackbarProps {
	open: boolean;
	onClose?: () => void;
	children: ReactNode;
	success: boolean;
}

const CustomSnackbar = ({ open, onClose, success, children }: CustomSnackbarProps) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={2000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<MuiAlert variant="filled" severity={success ? 'success' : 'error'} onClose={onClose}>
				{children}
			</MuiAlert>
		</Snackbar>
	);
};

export default CustomSnackbar;
