import { useEffect, useRef, useState } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Stack, Typography } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';
import CustomModal from '@/component/common/CustomModal';
import { Participant, ParticipantRole } from '@/type/channel.type';
import { AdminNickMenu, NickMenu } from '@/component/chat/NickMenu';
import ChannelSetting from '@/component/common/ChannelSetting';
import Chatroom from '@/type/chatroom.type';

interface PrivateParticipantListProps {
	isLoading: boolean;
	data: Chatroom[] | undefined;
}

export const PrivateParticipantList = ({ isLoading, data }: PrivateParticipantListProps) => {
	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						{isLoading ? (
							<div>로딩중</div>
						) : (
							<div>
								<UserBriefInformation
									nickname={null}
									condition={undefined}
									className={style['user-brief-information']}
									userId={''}
								/>
								<UserBriefInformation
									nickname={null}
									condition={undefined}
									className={style['user-brief-information']}
									userId={''}
								/>
							</div>
						)}
					</div>
				</div>
			</Stack>
		</div>
	);
};

interface ParticipantListProps {
	channelId: string;
	participantData?: Participant[] | null;
	isParticipantLoading?: boolean;
	myRole?: ParticipantRole;
	isProtected?: boolean;
}

const ParticipantList = ({
	channelId,
	participantData,
	isParticipantLoading,
	myRole,
	isProtected,
}: ParticipantListProps) => {
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState('');
	const [title, setTitle] = useState('');

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
		{ profileImageURI: null, nickname: '닉네임', role: ParticipantRole.OWNER, id: '1' },
		{ profileImageURI: null, nickname: '닉네임2', role: ParticipantRole.ADMIN, id: '2' },
		{ profileImageURI: null, nickname: '닉네임3', role: ParticipantRole.USER, id: '3' },
		{ profileImageURI: null, nickname: '닉네임4', role: ParticipantRole.USER, id: '4' },
	];

	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			{open && (
				<CustomModal setIsOpened={setOpen}>
					<ChannelSetting isCreate={false} setOpen={setOpen} />
				</CustomModal>
			)}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						{isParticipantLoading ? (
							<div>로딩중</div>
						) : (
							datas?.map((data, index) => (
								<UserBriefInformation
									key={index}
									nickname={
										myRole !== ParticipantRole.USER ? (
											<AdminNickMenu
												nickname={data?.nickname}
												userId={data?.id}
												channelId={channelId}
												isOwner={myRole === ParticipantRole.OWNER}
											/>
										) : (
											<NickMenu nickname={data?.nickname} userId={data?.id} />
										)
									}
									condition={<ChatStatus status={data?.role} />}
									className={style['user-brief-information']}
									userId={data?.id}
								/>
							))
						)}
					</div>
				</div>
				<button onClick={() => setOpen(true)} style={{ marginBottom: '4cqh' }}>
					채널설정
				</button>
			</Stack>
		</div>
	);
};

export default ParticipantList;
