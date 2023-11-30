import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { ModalBackground } from './background.modal';

export const Modal = (props: {
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}) => {
	const { setIsModalOpened, children } = props;

	useEffect(() => {
		if (document.body.children.length === 4) {
			document.body.style.cssText = `
			    position: fixed; 
			    top: -${window.scrollY}px;
			    overflow-y: scroll;
			    width: 100%;
			`;
		}
		return () => {
			if (document.body.children.length === 4) {
				const scrollY = document.body.style.top;

				document.body.style.cssText = '';
				window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
			}
		};
	}, []);

	return <ModalBackground setIsModalOpened={setIsModalOpened}>{children}</ModalBackground>;
};
