import { Stack } from '@mui/material';
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
		<CustomModal setIsOpened={setIsOpened}>
			<Stack alignItems={'center'} justifyContent={'center'} padding={20} gap={2}>
				<div>{title}</div>
				<div>{content}</div>
				<Stack flexDirection={'row'} gap={2}>
					<button onClick={onConfirm}>예</button>
					<button onClick={onCancel}>아니오</button>
				</Stack>
			</Stack>
		</CustomModal>
	);
};

export default CustomConfirmModal;
