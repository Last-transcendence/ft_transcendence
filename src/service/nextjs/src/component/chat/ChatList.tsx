import { useEffect, useRef, useState } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Stack, Typography } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';
import NickMenu from '@/component/chat/NickMenu';
import CustomModal from '@/component/common/CustomModal';
import { getFetcher } from '@/component/api/getFetcher';
import api from '@/component/api/base';
import { ParticipantRole } from '@/type/channel.type';

const ChattingListPage = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState('');
	const [title, setTitle] = useState('');
	const [data, setData] = useState<any[]>([]);
	const [isLoading, setLoading] = useState(false);
	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await getFetcher(`/channel/${id}/participant`);
			setData(res);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const ChatStatus = ({ status }: { status: ParticipantRole }) => {
		const spanRef = useRef<HTMLSpanElement>(null);
		const chatStatusLabel = { OWNER: '방장', ADMIN: '관리자', USER: '일반' };

		useEffect(() => {
			if (spanRef.current) {
				spanRef.current.style.color =
					status === 'OWNER' ? '#1CB119' : status === 'ADMIN' ? '#495D49' : '#9C27B0';
			}
		}, [status]);

		return (
			<div className={style.container}>
				<span ref={spanRef}>{chatStatusLabel[status]}</span>
			</div>
		);
	};
	const datas = [
		{ profileImageURI: null, nickname: '닉네임', role: ParticipantRole.OWNER },
		{ profileImageURI: null, nickname: '닉네임2', role: ParticipantRole.ADMIN },
		{ profileImageURI: null, nickname: '닉네임3', role: ParticipantRole.USER },
		{ profileImageURI: null, nickname: '닉네임4', role: ParticipantRole.USER },
	];

	const changeSetting = async () => {
		await api.patch(`/channel/${id}`, { password, title });
	};

	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			{/*채널 정보 가져와야함*/}
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
								profileImageSrc={data?.profileImageURI}
								nickname={
									<NickMenu nickname={data?.nickname} userId={me?.id} channelId={data?.id} />
								}
								condition={<ChatStatus status={data?.role} />}
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
