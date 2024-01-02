'use client';

import { useEffect, useState } from 'react';
import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';
import ChattingModeToggle from './chatting-mode';
import Link from 'next/link';
import { getFetcher } from '@/component/api/getFetcher';
import { Skeleton } from '@mui/material';

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
	
	//@todo api test
	// const [dmDatas, setDmDatas] = useState<any[]>([]);
	// const [isDmLoading, setDmLoading] = useState(false);
	// const fetchData = async () => {
	// 	try {
	// 		setDmLoading(true);
	// 		const res = await getFetcher('/chatroom');
	// 		setDmDatas(res);
	// 		setDmLoading(false);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 		setDmLoading(false);
	// 	}
	// };
	
	// useEffect(() => {
	// 	fetchData();
	// }, []);

	// if (isDmLoading) return <Skeleton />;
	// if (!dmDatas) return <div>DM이 없습니다.</div>;

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
