'use client';

import { useState } from 'react';
import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';
import ChattingModeToggle from './chatting-mode';

export type ChattingMode = 'normal' | 'private';

const MainPageBody = () => {
	const [mode, setMode] = useState<ChattingMode>('normal');

	return (
		<div className={style.container}>
			<div>
				<ChattingModeToggle mode={mode} setMode={setMode} />
				<div>
					<ChattingRoom title="Mockup data 1" visibility="public" numberOfPeople={1} />
					<ChattingRoom title="Mockup data 2" visibility="protected" numberOfPeople={2} />
					<ChattingRoom title="Mockup data 3" visibility="protected" numberOfPeople={3} />
				</div>
			</div>
		</div>
	);
};

export default MainPageBody;
