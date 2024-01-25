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
import CustomConfirmModal from '../CustomConfirmModal';

interface profileMenusProps {
	otherUserId: string;
	isblock: boolean;
	setIsBlockUser: Dispatch<SetStateAction<boolean | undefined>>;
	blockRefetch?: () => void;
	isFriend: boolean | undefined;
	refetch?: () => void;
}

const ProfileMenus = ({
	otherUserId,
	isblock,
	setIsBlockUser,
	blockRefetch,
	isFriend,
	refetch,
}: profileMenusProps) => {
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [blockOpen, setBlockOpen] = useState<boolean>(false);
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
				if (refetch !== undefined) refetch();
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
			{blockOpen && (
				<CustomConfirmModal
					setIsOpened={setBlockOpen}
					title={`해당 유저의 모든 것을 영구히 차단하게 됩니다. (복원 불가)`}
					content="수락하시겠습니까?"
					onConfirm={() => {
						blockFetch();
					}}
					onCancel={() => {}}
				/>
			)}
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
									<MenuItem onClick={() => setBlockOpen(true)} disabled={isblock}>
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
