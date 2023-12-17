import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import NickMenu from '@/component/chat/NickMenu';

export const ChatMsg = () => {
	return (
		<Stack flexDirection={'row'} alignItems={'center'} gap={1}>
			<Stack flexDirection={'row'} width={'280px'} gap={1} alignItems={'center'}>
				<Avatar alt="avatar" src="/static/images/avatar/2.jpg" />
				<NickMenu />
			</Stack>
			<Typography>
				프로필 이미지는 안 보이는 게 낫나? 프로필 이미지는 안 보이는 게 낫나? 프로필 이미지는 안
				보이는 게 낫나? 프로필 이미지는 안 보이는 게 낫나?
			</Typography>
		</Stack>
	);
};

export const StatusMsg = () => {
	return <Typography fontWeight={'bold'}>닉네임 님이 나가셨습니다</Typography>;
};

export const HelpMsg = () => {
	const helpTextStyle = { color: 'darkorange', fontWeight: 'bold' };

	return (
		<Box padding={1} bgcolor={'lightgrey'}>
			<Typography>도움말</Typography>
			<Typography>
				<span style={helpTextStyle}>/w &lt;닉네임&gt; &lt;메세지&gt;: </span>
				&lt;닉네임&gt;에게 &lt;메세지&gt;를 보냅니다
			</Typography>
			<Typography>
				<span style={helpTextStyle}>/i &lt;닉네임&gt;:</span> &lt;닉네임&gt;을 해당 채팅방에
				초대합니다
			</Typography>
			<Typography>
				<span style={helpTextStyle}>/g &lt;닉네임&gt;:</span> &lt;닉네임&gt;에게 1:1 게임 매칭을
				요청합니다
			</Typography>
		</Box>
	);
};
