import { Button, Stack, TextField, Typography } from '@mui/material';
import CustomModal from '@/component/common/CustomModal';
import { Dispatch, SetStateAction } from 'react';

interface CustomConfirmModalProps {
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	title: string;
	content: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export const CustomConfirmModal = ({
	setIsOpened,
	title,
	content,
	onConfirm,
	onCancel,
}: CustomConfirmModalProps) => {
	return (
		<CustomModal setIsOpened={setIsOpened} halfHeight>
			<Stack
				spacing={2}
				width={'100cqh'}
				height={'100cqh'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<div>{title}</div>
				<div>{content}</div>
				<Stack flexDirection={'row'} gap={2}>
					<Button
						variant={'contained'}
						onClick={() => {
							onConfirm();
							setIsOpened(false);
						}}
					>
						예
					</Button>
					<Button
						variant={'contained'}
						onClick={() => {
							onCancel();
							setIsOpened(false);
						}}
					>
						아니오
					</Button>
				</Stack>
			</Stack>
		</CustomModal>
	);
};

export default CustomConfirmModal;
