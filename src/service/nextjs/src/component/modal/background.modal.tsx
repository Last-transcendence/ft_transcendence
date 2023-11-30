import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { ModalBackgroundStyle } from './background.modal.style';
import { createPortal } from 'react-dom';
import { CloseIcon } from './icon';

export const ModalBackground = (props: {
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}) => {
	const { setIsModalOpened, children } = props;

	return createPortal(
		<div
			className={ModalBackgroundStyle}
			onClick={() => {
				setIsModalOpened(false);
			}}
		>
			<div>
				<div>
					<CloseIcon
						width={28}
						height={28}
						onClick={() => {
							setIsModalOpened(false);
						}}
					/>
				</div>
				<div
					onClick={event => {
						event.stopPropagation();
					}}
				>
					{children}
				</div>
			</div>
		</div>,
		document.body,
	);
};
