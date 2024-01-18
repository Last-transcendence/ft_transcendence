import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import NickMenu from '@/component/chat/NickMenu';
import AdminNickMenu from '@/component/chat/AdminNickMenu';
import { ParticipantRole } from '@/type/channel.type';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';
import User from '@/type/user.type';

interface ChatMsgProps {
	userData: User;
	channelId: string;
	myRole?: ParticipantRole;
	ownerId: string | undefined;
	message: string;
}

export const ChatMsg = ({ userData, channelId, myRole, ownerId, message }: ChatMsgProps) => {
	return (
		<Stack flexDirection={'row'} alignItems={'center'} gap={1}>
			<Stack flexDirection={'row'} gap={1} alignItems={'center'} width={'100%'}>
				<OpenProfileAvatar otherUserId={userData?.id} imgUrl={userData?.profileImageURI} />
				{myRole && myRole !== ParticipantRole.USER ? (
					<AdminNickMenu
						nickname={userData?.nickname}
						userId={userData.id}
						channelId={channelId}
						ownerId={ownerId}
					/>
				) : (
					<NickMenu nickname={userData?.nickname} />
				)}
			</Stack>
			<Typography>{message}</Typography>
		</Stack>
	);
};

export const StatusMsg = ({ message }: { message: string }) => {
	return <Typography fontWeight={'bold'}>{message}</Typography>;
};

export const HelpMsg = () => {
	const helpTextStyle = { color: 'darkorange', fontWeight: 'bold' };

	return (
		<Box padding={1} bgcolor={'lightgrey'}>
			<Typography fontSize={'small'} fontWeight={'bold'}>
				도움말
			</Typography>
			<Typography fontSize={'small'}>
				<span style={helpTextStyle}>/w &lt;닉네임&gt; &lt;메세지&gt;: </span>
				&lt;닉네임&gt;에게 &lt;메세지&gt;를 보냅니다
			</Typography>
			<Typography fontSize={'small'}>
				<span style={helpTextStyle}>/g &lt;닉네임&gt;:</span> &lt;닉네임&gt;에게 1:1 게임 매칭을
				요청합니다
			</Typography>
		</Box>
	);
};
