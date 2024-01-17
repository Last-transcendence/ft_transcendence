import style from '@/style/chat/create/index.module.css';
import { Header } from '@/component/common/Header';
import { Stack, Typography } from '@mui/material';
import CreateChatVisibility from '@/component/chat/create/visibility';
import CreateChatTitle from '@/component/chat/create/title';
import CreateChatPassword from '@/component/chat/create/password';
import { BottomButton } from '@/component/common/ButtomButton';
import { Channel, ChannelVisibility } from '@/type/channel.type';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import CustomSnackbar from '@/component/profile/modifyProfile/customSnackbar';
import { patchFetcher, postFetcher } from '@/service/api';
import { useRouter } from 'next/router';
import SocketContext from '@/context/socket.context';
import { useRouter } from 'next/navigation';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';

interface ChannelSettingProps {
	isCreate: boolean;
	setOpen?: Dispatch<SetStateAction<boolean>>;
	channelData?: Channel;
}

const ChannelSetting = ({ isCreate, setOpen, channelData }: ChannelSettingProps) => {
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const router = useRouter();
	const label = isCreate ? '채널 생성' : '채널 수정';
	const [visibility, setVisibility] = useState<ChannelVisibility>(
		channelData?.visibility ?? ChannelVisibility.PUBLIC,
	);
	const [title, setTitle] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [message, setMessage] = useState({
		title: '',
		success: true,
	});
	const router = useRouter();

	const handleSubmit = async () => {
		setMessage({
			title: '',
			success: false,
		});
		if (visibility === ChannelVisibility.PROTECTED && !password && password === '') {
			setMessage({
				title: '비밀번호를 입력해주세요.',
				success: false,
			});
		}
		if (visibility === ChannelVisibility.PROTECTED && password.length !== 6) {
			setMessage({
				title: '비밀번호는 6자리 숫자로 입력해주세요.',
				success: false,
			});
		}
		if (!title || title === '') {
			setMessage({
				title: '채널명을 입력해주세요.',
				success: false,
			});
		}
		if (title.length > 8) {
			setMessage({
				title: '채널명은 8자 이내로 입력해주세요.',
				success: false,
			});
		}

		if (message.title.length) {
			return setShowSnackbar(true);
		}

	//채널 create 시 채널 정보 리슨.
	useListeningChannelEvent('create', res => {
		console.log('res', res);
		res.channelId && router.push(`/chat/${res.channelId}`);
	});

	// 채널 생성
	const handleSubmit = useCallback(() => {
		const req = {
			visibility,
			title,
			password: visibility === ChannelVisibility.PROTECTED ? password : undefined,
		};

		//채널은 생성되면 아이디 받고 이동하기
		if (isCreate) {
			channelSocket?.emit('create', req, (res: any) => {
				console.log(res);
			});
			//navigate
		} else {
			channelSocket?.emit('edit', { ...req, channelId: channelData?.id }, (res: any) => {
				console.log(res);
			});
		}

		//@todo 소켓 에러처리 공부
		// setMessage({
		// 	title: label + ' 성공',
		// 	success: true,
		// });
		// try {
		// } catch (e) {
		// 	setMessage({
		// 		title: label + ' 실패',
		// 		success: false,
		// 	});
		// 	console.error(e);
		// } finally {
		// 	setShowSnackbar(true);
		// }
	}, [channelData?.id, channelSocket, isCreate, password, title, visibility]);

	return (
		<div>
			<CustomSnackbar
				open={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				message={message.title}
				success={message.success}
				position={'top'}
				horizontal={'center'}
			/>
			<div className={isCreate ? style.container : style.editContainer}>
				{isCreate ? <Header title={label} /> : <Typography>채널 설정</Typography>}
				<Stack gap={4}>
					<CreateChatVisibility visibility={visibility} setVisibility={setVisibility} />
					<CreateChatTitle title={title} setTitle={setTitle} />
					{visibility === 'PROTECTED' && (
						<CreateChatPassword password={password} setPassword={setPassword} />
					)}
				</Stack>
				{isCreate ? (
					<BottomButton title={'생성하기'} onClick={handleSubmit} />
				) : (
					<Stack flexDirection={'row'} gap={1}>
						<button onClick={() => setOpen && setOpen(false)}>취소</button>
						<button onClick={handleSubmit}>수정하기</button>
					</Stack>
				)}
			</div>
		</div>
	);
};

export default ChannelSetting;
