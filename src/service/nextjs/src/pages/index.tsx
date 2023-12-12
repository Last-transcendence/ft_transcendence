import Head from 'next/head';
import { Box } from '@mui/material';

const MainPage = () => {
	return (
		<>
			<Head>
				<title>ft_transcendence</title>
				<meta name="description" content="ft_transcendence is Ping Pong game" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box bgcolor={'yellow'}>메인 페이지</Box>
		</>
	);
};

export default MainPage;
