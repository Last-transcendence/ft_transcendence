'use client';

import { useState } from 'react';
import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';
import ChattingModeToggle from './chatting-mode';
import Link from 'next/link';

export type ChattingMode = 'normal' | 'private';

const MainPageBody = () => {
	const [mode, setMode] = useState<ChattingMode>('normal');

	const datas = [
		{ id: 1, title: 'Mockup data 1', visibility: 'public', numberOfPeople: 1 },
		{ id: 2, title: 'Mockup data 2', visibility: 'protected', numberOfPeople: 2 },
		{ id: 3, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
		{ id: 4, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
		{ id: 5, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
	];
	return (
		<div className={style.container}>
			<div>
				<ChattingModeToggle mode={mode} setMode={setMode} />
				<div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
					{datas?.map(data => (
						<Link key={data?.id} href={`/chat/${data?.id}`} style={{ textDecoration: 'none' }}>
							<ChattingRoom
								title={data?.title}
								visibility={data?.visibility as 'private' | 'public' | 'protected'}
								numberOfPeople={data?.numberOfPeople}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MainPageBody;
