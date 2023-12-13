import Head from 'next/head';
import { Box } from '@mui/material';
import style from '../style/main/index.module.css';
import MainPageFooter from '@/component/main/footer';
import MatchingButton from '@/component/main/matching-button';
import MainPageBody from '@/component/main/body';

const MainPage = () => {
	return (
		<>
			<Head>
				<title>ft_transcendence</title>
				<meta name="description" content="ft_transcendence is Ping Pong game" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={style.container}>
				<MainPageBody />
				<MatchingButton />
				<MainPageFooter />
			</div>
		</>
	);
};

export default MainPage;
