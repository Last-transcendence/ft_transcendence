import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import style from '@/style/friend/list/index.module.css';
import { Button, Stack } from '@mui/material';
import UserBriefInformation from '@/component/common/user/bried-information';
import CustomModal from '@/component/common/CustomModal';
import { AdminActionType, Mute, ParticipantRole } from '@/type/channel.type';
import NickMenu from '@/component/chat/NickMenu';
import AdminNickMenu from '@/component/chat/AdminNickMenu';
import ChannelSetting from '@/component/common/ChannelSetting';
import SocketContext from '@/context/socket.context';
import AuthContext from '@/context/auth.context';
import { ChannelInfo } from '@/type/channel-info.type';
import { useRouter } from 'next/router';

interface ParticipantListProps {
	myRole?: ParticipantRole;
	ownerId: string | undefined;
	channelData: ChannelInfo | undefined;
	channelId: string;
	adminAction?: (action: AdminActionType, nickname: string, id: string) => void;
}

const ParticipantList = ({
	myRole,
	ownerId,
	channelData,
	channelId,
	adminAction,
}: ParticipantListProps) => {
	const router = useRouter();
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
			if (!channelData?.mute || channelData?.mute.length == 0) return false;
			return channelData?.mute?.some((data: Mute) => data?.id === userId);
		},
		[channelData?.mute],
	);

	const handleLeave = useCallback(() => {
		channelSocket!.emit('leave', { channelId, userId: me?.id }, (res: any) => {
			console.log('leave emit', res);
			if (res?.res) {
				router.push('/');
			}
		});
	}, [channelId, channelSocket, me?.id, router]);

	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			{open && (
				<CustomModal setIsOpened={setOpen}>
					<ChannelSetting
						isCreate={false}
						setOpen={setOpen}
						channelData={channelData}
						channelId={channelId}
						refetch={adminAction ? adminAction('setting', '', '') : undefined}
					/>
				</CustomModal>
			)}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						{channelData?.participant?.map((data, index) => (
							<UserBriefInformation
								key={index}
								nickname={
									myRole !== 'USER' ? (
										<AdminNickMenu
											adminAction={adminAction}
											nickname={data?.user?.nickname}
											userId={data?.userId}
											channelId={channelId}
											ownerId={ownerId}
											isMute={isMute(data?.userId)}
										/>
									) : (
										<NickMenu nickname={data?.user?.nickname} />
									)
								}
								condition={<ChatStatus status={data?.role as ParticipantRole} />}
								className={style['user-brief-information']}
								userId={data?.userId}
								isMute={isMute(data?.userId)}
								imgUrl={data?.user?.profileImageURI}
							/>
						))}
					</div>
				</div>
				<Stack gap={1} flexDirection={'row'} mb={'4cqh'}>
					{/*owner에게만 노출*/}
					{ownerId === me?.id && (
						<Button variant={'contained'} onClick={() => setOpen(true)}>
							채널설정
						</Button>
					)}
					<Button variant={'contained'} onClick={handleLeave}>
						채널 나가기
					</Button>
				</Stack>
			</Stack>
		</div>
	);
};

export default ParticipantList;
