import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Button, Stack, Typography } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';
import CustomModal from '@/component/common/CustomModal';
import { Ban, Mute, Participant, ParticipantRole } from '@/type/channel.type';
import NickMenu from '@/component/chat/NickMenu';
import AdminNickMenu from '@/component/chat/AdminNickMenu';
import Chatroom from '@/type/chatroom.type';
import ChannelSetting from '@/component/common/ChannelSetting';
import SocketContext from '@/context/socket.context';
import AuthContext from '@/context/auth.context';

interface PrivateParticipantListProps {
	data: Chatroom[] | undefined;
}

export const PrivateParticipantList = ({ data }: PrivateParticipantListProps) => {
	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						<div>
							<UserBriefInformation
								nickname={null}
								condition={undefined}
								className={style['user-brief-information']}
								userId={''}
								imgUrl={''}
							/>
							<UserBriefInformation
								nickname={null}
								condition={undefined}
								className={style['user-brief-information']}
								userId={''}
								imgUrl={''}
							/>
						</div>
					</div>
				</div>
			</Stack>
		</div>
	);
};

interface ParticipantListProps {
	channelId: string;
	participantData?: Participant[] | null | undefined;
	myRole?: ParticipantRole;
	isProtected?: boolean;
	ownerId: string | undefined;
	muteList: Mute[];
}

const ParticipantList = ({
	channelId,
	participantData,
	myRole,
	isProtected,
	ownerId,
	muteList,
}: ParticipantListProps) => {
	const [open, setOpen] = useState(false);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const { me } = useContext(AuthContext);

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

	const isMute = useCallback(
		(userId: string) => {
			if (!userId) return false;
			if (!muteList) return false;
			return muteList.some((data: Mute) => data.id === userId);
		},
		[muteList],
	);

	const handleLeave = useCallback(() => {
		channelSocket!.emit('leave', { channelId, userId: me?.id }, (res: any) => {
			if (res) {
				//루트로 네비게이션
			}
			console.log(res);
		});
	}, []);

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
						{participantData?.map((data, index) => (
							<UserBriefInformation
								key={index}
								nickname={
									myRole !== ParticipantRole.USER ? (
										<AdminNickMenu
											nickname={data?.user.nickname}
											userId={data?.userId}
											channelId={channelId}
											ownerId={ownerId}
											isMute={isMute(data?.userId)}
										/>
									) : (
										<NickMenu nickname={data?.user.nickname} />
									)
								}
								condition={<ChatStatus status={data?.role} />}
								className={style['user-brief-information']}
								userId={data?.userId}
								isMute={isMute(data?.userId)}
								imgUrl={data?.user.profileImageURI}
							/>
						))}
					</div>
				</div>
				<Stack gap={1} flexDirection={'row'} mb={'4cqh'}>
					<Button variant={'contained'} onClick={() => setOpen(true)}>
						채널설정
					</Button>
					<Button variant={'contained'} onClick={handleLeave}>
						채널 나가기
					</Button>
				</Stack>
			</Stack>
		</div>
	);
};

export default ParticipantList;
