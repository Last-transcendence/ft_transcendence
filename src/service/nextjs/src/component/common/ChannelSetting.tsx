import style from '@/style/chat/create/index.module.css';
import { Header } from '@/component/common/Header';
import { Stack, Typography } from '@mui/material';
import CreateChatVisibility from '@/component/chat/create/visibility';
import CreateChatTitle from '@/component/chat/create/title';
import CreateChatPassword from '@/component/chat/create/password';
import { BottomButton } from '@/component/common/ButtomButton';
import { Channel, ChannelVisibility } from '@/type/channel.type';
import { Dispatch, SetStateAction, useState } from 'react';
import CustomSnackbar from '@/component/profile/modifyProfile/customSnackbar';
import { patchFetcher, postFetcher } from '@/service/api';

interface ChannelSettingProps {
	isCreate: boolean;
	setOpen?: Dispatch<SetStateAction<boolean>>;
	channelData?: Channel;
}

const ChannelSetting = ({ isCreate, setOpen, channelData }: ChannelSettingProps) => {
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

	const handleSubmit = async () => {
		const req = {
			visibility,
			title,
			password,
		};

		try {
			isCreate
				? await postFetcher('/channel', req)
				: await patchFetcher(`/channel/${channelData?.id}`, req);

			setMessage({
				title: label + ' 성공',
				success: true,
			});
		} catch (e) {
			setMessage({
				title: label + ' 실패',
				success: false,
			});
			console.error(e);
		} finally {
			setShowSnackbar(true);
		}
	};

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
					<CreateChatPassword password={password} setPassword={setPassword} />
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
