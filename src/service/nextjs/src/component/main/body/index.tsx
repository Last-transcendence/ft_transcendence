'use client';

import { useState } from 'react';
import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';
import ChattingModeToggle from './chatting-mode';
import Link from 'next/link';

export type ChattingMode = 'normal' | 'private';

const MainPageBody = () => {
	const [mode, setMode] = useState<ChattingMode>('normal');
	/** channel api*/
	const channelData = [
		{ id: 1, title: 'Mockup data 1', visibility: 'public', numberOfPeople: 1 },
		{ id: 2, title: 'Mockup data 2', visibility: 'protected', numberOfPeople: 2 },
		{ id: 3, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
		{ id: 4, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
		{ id: 5, title: 'Mockup data 3', visibility: 'protected', numberOfPeople: 3 },
	];
	/** chat room api*/
	const dmData = [
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
				{mode === 'normal' ? (
					<div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
						{channelData?.map(data => (
							<Link
								key={data?.id}
								href={`/chat/${data?.id}/common`}
								style={{ textDecoration: 'none' }}
							>
								<ChattingRoom
									title={data?.title}
									visibility={data?.visibility as 'public' | 'protected'}
									numberOfPeople={data?.numberOfPeople}
								/>
							</Link>
						))}
					</div>
				) : (
					<div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
						{dmData?.map(data => (
							<Link
								key={data?.id}
								href={`/chat/${data?.id}/private`}
								style={{ textDecoration: 'none' }}
							>
								<ChattingRoom
									title={data?.title}
									visibility={'private'}
									numberOfPeople={data?.numberOfPeople}
								/>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MainPageBody;
