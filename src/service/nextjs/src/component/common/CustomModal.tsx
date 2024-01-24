'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from '../../style/common/custom-modal/index.module.css';

interface CustomModalProps {
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	children?: ReactNode;
	halfHeight?: boolean;
}

const CustomModal = ({ setIsOpened, children, halfHeight }: CustomModalProps) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		isClient &&
		createPortal(
			<div
				className={halfHeight ? style.half_container : style.container}
				onClick={() => {
					setIsOpened(false);
				}}
			>
				<div
					onClick={event => {
						event.stopPropagation();
					}}
				>
					<div>{children && children}</div>
				</div>
			</div>,
			document.body,
		)
	);
};

export default CustomModal;
