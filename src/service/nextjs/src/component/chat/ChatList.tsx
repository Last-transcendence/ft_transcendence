import React, { useEffect, useRef } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Button, Stack } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';

interface StatusProps {
	status?: '방장' | '관리자';
}
const ChatStatus = ({ status }: StatusProps) => {
	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (spanRef.current) {
			spanRef.current.style.color =
				status === '방장' ? '#1CB119' : status === '관리자' ? '#495D49' : '#9C27B0';
		}
	}, [status]);

	return (
		<div className={style.container}>
			<span ref={spanRef}>{status}</span>
		</div>
	);
};

const ChattingListPage = () => {
	return (
		<Stack justifyContent={'space-between'} height={'100%'}>
			<div className={style.container}>
				<div>참여 목록</div>
				<div>
					<UserBriefInformation
						profileImageSrc={null}
						nickName="닉네임1"
						condition={<ChatStatus status="방장" />}
						className={style['user-brief-information']}
					/>
					<UserBriefInformation
						profileImageSrc={null}
						nickName="닉네임2"
						condition={<ChatStatus status="관리자" />}
						className={style['user-brief-information']}
					/>
					<UserBriefInformation
						profileImageSrc={null}
						nickName="닉네임3"
						condition={<ChatStatus />}
						className={style['user-brief-information']}
					/>
				</div>
			</div>
			<Button sx={{ marginBottom: 4 }}>채널 설정</Button>
		</Stack>
	);
};

export default ChattingListPage;
