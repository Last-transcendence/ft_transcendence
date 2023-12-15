'use-client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ChattingMode } from '..';
import style from '../../../../style/main/body/chatting-mode/index.module.css';

interface ChangeModeProps {
	mode: ChattingMode;
	setMode: Dispatch<SetStateAction<ChattingMode>>;
	newMode: ChattingMode;
}

const changeMode = ({ mode, setMode, newMode }: ChangeModeProps) => {
	if (mode === newMode) {
		return;
	}
	setMode(newMode);
};

interface ChattingModeProps {
	mode: ChattingMode;
	setMode: Dispatch<SetStateAction<ChattingMode>>;
}

const ChattingModeToggle = ({ mode, setMode }: ChattingModeProps) => {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			const selectedSpan = divRef.current.children[mode === 'normal' ? 0 : 1] as HTMLSpanElement;
			const unselectedSpan = divRef.current.children[mode === 'normal' ? 1 : 0] as HTMLSpanElement;

			selectedSpan.style.borderBottom = '2px solid #9C27B0';
			selectedSpan.style.fontFamily = 'Inter-Bold';
			unselectedSpan.style.borderBottom = '2px solid transparent';
			unselectedSpan.style.fontFamily = 'Inter';
		}
	}, [mode]);

	return (
		<div className={style.container} ref={divRef}>
			<span onClick={() => changeMode({ mode, setMode, newMode: 'normal' })}>일반 채팅</span>
			<span onClick={() => changeMode({ mode, setMode, newMode: 'private' })}>1:1 채팅</span>
		</div>
	);
};

export default ChattingModeToggle;
