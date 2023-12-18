'use client';

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from '../../../style/common/hambergur-menu/index.module.css';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface HambergurMenuProps {
	title: string;
	position: 'left' | 'right';
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}

const HambergurMenu = ({ title, position, setIsOpened, children }: HambergurMenuProps) => {
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
						style={{ margin: position === 'right' ? '0 0 0 auto' : '0 auto 0 0' }}
					>
						<div className={style.header}>
							<span>{title}</span>
							<IconButton onClick={() => setIsOpened(false)}>
								<Close width={32} height={32} />
							</IconButton>
						</div>
						<div>{children}</div>
					</div>
				</div>
			</div>,
			document.body,
		)
	);
};

export default HambergurMenu;
