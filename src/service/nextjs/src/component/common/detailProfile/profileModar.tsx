import { Dispatch, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/style/profile/profileModar.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface ProfileModarProps {
	setClick: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
	childMenu: ReactNode;
	blockRefetch?: () => void;
}

const ProfileModar = ({ setClick, children, childMenu, blockRefetch }: ProfileModarProps) => {
	return createPortal(
		<div className={styles.container}>
			<div>
				<div
					onClick={event => {
						event.stopPropagation();
					}}
				>
					<div className={styles.header}>
						{childMenu}
						<CloseIcon
							width="30"
							height="30"
							onClick={() => {
								setClick(false);
							}}
						/>
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>,
		document.body,
	);
};

export default ProfileModar;
