import { KeyboardEvent, useState, useRef, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { deleteFetcher, postFetcher } from '@/service/api';
import CustomSnackbar from '../customSnackbar';
import { Dispatch, SetStateAction } from 'react';

interface profileMenusProps {
	otherUserId: string; 
	isblock: boolean;
	setIsBlockUser: Dispatch<SetStateAction<boolean | undefined>>;
	blockRefetch?: () => void;
	isFriend: boolean | undefined;
}

const ProfileMenus = ({ otherUserId, isblock, setIsBlockUser, blockRefetch, isFriend }: profileMenusProps) => {
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: Event | SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const blockFetch = async () => {
		try {
			const responce = await postFetcher('/block', { blockedId: otherUserId });
			if (isFriend === true) {
				await deleteFetcher(`/friend/${otherUserId}`);
			}
			setIsBlockUser(true);
			if (blockRefetch !== undefined) blockRefetch();
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setOpen(false);
		}
	};

	function handleListKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const handleSnackbarClose = () => {
		setErrorMessage('');
	};

	return (
		<div>
			<CustomSnackbar
				open={errorMessage === '' ? false : true}
				onClose={handleSnackbarClose}
				success={false}
			>
				{errorMessage}
			</CustomSnackbar>
			<Button ref={anchorRef} onClick={handleToggle}>
				● ● ●
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
									<MenuItem onClick={blockFetch} disabled={isblock}>
										{isblock ? '차단된 유저' : '유저 차단'}
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default ProfileMenus;
