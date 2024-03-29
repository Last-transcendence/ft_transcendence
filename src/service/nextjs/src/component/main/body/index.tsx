'use client';

import { useCallback, useContext, useState } from 'react';
import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';
import ChattingModeToggle from './chatting-mode';
import { Box, Button, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PositionableSnackbar from '@/component/common/PositionableSnackbar';
import Chatroom from '@/type/chatroom.type';
import { Channel } from '@/type/channel.type';
import useFetchData from '@/hook/useFetchData';
import { AxiosError } from 'axios';
import SocketContext from '@/context/socket.context';
import CustomModal from '@/component/common/CustomModal';

export type ChattingMode = 'normal' | 'private';

const MainPageBody = () => {
	const router = useRouter();
	const [mode, setMode] = useState<ChattingMode>('normal');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [message, setMessage] = useState<string>('');
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState<string>('');
	const { channelSocket, chatSocket } = useContext(SocketContext).sockets;
	const [id, setId] = useState<string | undefined>();

	/** channel api*/
	const {
		data: chatDatas,
		isLoading: isChatLoading,
		error: chatError,
	} = useFetchData<Channel[]>('/channel');

	/** chatroom api **/
	const {
		data: dmDatas,
		isLoading: isDmLoading,
		error: dmError,
	} = useFetchData<Chatroom[]>('/chatroom');

	const navigateChannel = useCallback(
		(channelId: string | undefined, password?: string) => {
			if (!channelSocket) return;
			channelSocket?.emit('join', { channelId, password }, (res: any) => {
				// console.log('channel join res', res);
				if (res?.res) router.push(`/chat/${channelId}/common`);
				else alert(`채널 입장에 실패했습니다. ${res?.message?.message}`);
			});
		},
		[channelSocket, router],
	);

	const navigateChatroom = useCallback(
		(destId: string) => {
			if (!destId) return;
			if (!chatSocket) return;
			chatSocket.emit('join', { destId }, (res: any) => {
				// console.log('join emit res', res);
				router.push(`/chat/${destId}/private`);
			});
		},
		[chatSocket, router],
	);

	const getView = (
		isLoading: boolean,
		datas: Channel[] | Chatroom[] | undefined | null,
		error: AxiosError | null | undefined,
	) => {
		if (isLoading) return <Skeleton />;
		if (!datas || error) return <div>데이터를 불러오지 못했습니다.</div>;
		if (datas?.length === 0) return <div>데이터가 없습니다.</div>;

		const openPasswordModal = (id: string) => {
			setId(id);
			setOpen(true);
		};

		return (
			<>
				{open && (
					<CustomModal setIsOpened={setOpen}>
						<Stack
							spacing={2}
							width={'100cqh'}
							height={'100cqh'}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<PositionableSnackbar
								open={showSnackbar}
								onClose={() => setShowSnackbar(false)}
								message={message}
								success={false}
								position={'bottom'}
								horizontal={'center'}
							/>
							<Typography>비밀번호를 입력해주세요. (6자리 숫자)</Typography>
							<TextField
								size="small"
								value={password}
								onChange={e => {
									if (e.target.value.length > 6) return;
									setPassword(e.target.value.replace(/[^0-9]/g, ''));
								}}
							/>
							<Stack flexDirection={'row'} gap={1}>
								<Button variant={'contained'} onClick={() => navigateChannel(id, password)}>
									입장
								</Button>
								<Button variant={'contained'} onClick={() => setOpen(false)}>
									취소
								</Button>
							</Stack>
						</Stack>
					</CustomModal>
				)}
				{datas?.map(
					data =>
						(data as Channel)?.visibility !== 'PRIVATE' && (
							<Box
								key={data.id}
								onClick={() =>
									mode === 'normal'
										? (data as Channel)?.visibility === 'PROTECTED'
											? openPasswordModal(data?.id)
											: navigateChannel(data?.id)
										: navigateChatroom((data as Chatroom)?.destId)
								}
								style={{ textDecoration: 'none' }}
							>
								<ChattingRoom
									title={
										mode === 'normal'
											? (data as Channel)?.title
											: `${(data as Chatroom)?.destNickname}님과의 대화`
									}
									visibility={
										mode === 'normal'
											? ((data as Channel)?.visibility as 'PUBLIC' | 'PROTECTED')
											: 'PRIVATE'
									}
								/>
							</Box>
						),
				)}
			</>
		);
	};

	return (
		<div className={style.container}>
			<div>
				{!open && (
					<PositionableSnackbar
						open={showSnackbar}
						onClose={() => setShowSnackbar(false)}
						message={message}
						success={false}
					/>
				)}
				<ChattingModeToggle mode={mode} setMode={setMode} />
				<div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
					{mode === 'normal'
						? getView(isChatLoading, chatDatas, chatError)
						: getView(isDmLoading, dmDatas, dmError)}
				</div>
			</div>
		</div>
	);
};

export default MainPageBody;
