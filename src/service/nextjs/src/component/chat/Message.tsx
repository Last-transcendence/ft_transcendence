import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { AdminNickMenu, NickMenu } from '@/component/chat/NickMenu';
import { ParticipantRole } from '@/type/channel.type';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';

interface ChatMsgProps {
	userId: string;
	channelId?: string;
	nickname?: string;
	myRole?: ParticipantRole;
	ownerId: string | undefined;
	message: string;
}

//@todo props drilling 해결
//@todo 닉네임 정책 있는지 확인 (닉네임 글자수)
export const ChatMsg = ({
	userId,
	channelId,
	nickname,
	myRole,
	ownerId,
	message,
}: ChatMsgProps) => {
	return (
		<Stack flexDirection={'row'} alignItems={'center'} gap={1}>
			<Stack flexDirection={'row'} gap={1} alignItems={'center'} width={'100%'}>
				<OpenProfileAvatar otherUserId={userId} />
				{myRole && myRole !== ParticipantRole.USER ? (
					//@todo ''는 타입스크립트 오류때문에 넣었습니다. 추후 지우겠습니다
					<AdminNickMenu
						nickname={nickname || ''}
						userId={userId}
						channelId={channelId || ''}
						ownerId={ownerId}
					/>
				) : (
					<NickMenu nickname={nickname || ''} />
				)}
			</Stack>
			<Typography>{message}</Typography>
		</Stack>
	);
};

export const StatusMsg = ({ content }: { content: string }) => {
	return <Typography fontWeight={'bold'}>{content}</Typography>;
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
