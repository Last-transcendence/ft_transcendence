import { useEffect, useRef, useState } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Stack, Typography } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';
import NickMenu from '@/component/chat/NickMenu';
import CustomModal from '@/component/common/CustomModal';

interface StatusProps {
	status?: '방장' | '관리자';
}

const ChattingListPage = () => {
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState('');
	const [title, setTitle] = useState('');
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
	const datas = [
		{ profileImageSrc: null, nickName: '닉네임', condition: '방장' },
		{ profileImageSrc: null, nickName: '닉네임2', condition: '관리자' },
		{ profileImageSrc: null, nickName: '닉네임3', condition: '일반' },
		{ profileImageSrc: null, nickName: '닉네임4', condition: '일반' },
	];

	const changeSetting = () => {
		alert(password);
		alert(title);
	};

	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			{open && (
				<CustomModal setIsOpened={setOpen}>
					<Stack height="100cqh" justifyContent={'space-around'} alignItems={'center'}>
						<Typography fontWeight={'bold'}>채널설정</Typography>
						<Typography>채널명</Typography>
						<input value={title} onChange={event => setTitle(event.target.value)} />
						<Typography>비밀번호</Typography>
						<input value={password} onChange={event => setPassword(event.target.value)} />
						<Stack flexDirection={'row'} gap={1}>
							<button onClick={() => setOpen(false)}>취소</button>
							<button onClick={changeSetting}>수정</button>
						</Stack>
					</Stack>
				</CustomModal>
			)}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						{datas?.map((data, index) => (
							<UserBriefInformation
								key={index}
								profileImageSrc={data?.profileImageSrc}
								nickName={<NickMenu nick={data?.nickName} />}
								condition={<ChatStatus status={data?.condition as '방장' | '관리자' | undefined} />}
								className={style['user-brief-information']}
							/>
						))}
					</div>
				</div>
				<button onClick={() => setOpen(true)} style={{ marginBottom: '4cqh' }}>
					채널설정
				</button>
			</Stack>
		</div>
	);
};

export default ChattingListPage;
