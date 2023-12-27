'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from '../../style/common/custom-modal/index.module.css';

interface CustomModalProps {
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}

const CustomModal = ({ setIsOpened, children }: CustomModalProps) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		isClient &&
		createPortal(
			<div
				className={style.container}
				onClick={() => {
					setIsOpened(false);
				}}
			>
				<div>
					<div
						onClick={event => {
							event.stopPropagation();
						}}
					>
						<div>{children}</div>
					</div>
				</div>
			</div>,
			document.body,
		)
	);
};

export default CustomModal;
