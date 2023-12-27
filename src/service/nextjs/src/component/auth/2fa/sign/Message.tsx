import { Box, Typography } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Message = () => {
	return (
		<Box marginTop={2} marginBottom={0} paddingLeft={2} paddingRight={2}>
			<ThemeProvider theme={theme}>
				<Typography variant="body1" component="h1" noWrap>
					2차인증 이메일로 인증코드를 전송했습니다.
					<span>
						<br />
					</span>
					인증코드를 입력해주세요.
				</Typography>
			</ThemeProvider>
		</Box>
	);
};

export default Message;
