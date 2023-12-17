import Head from 'next/head';
import { Box } from '@mui/material';
import style from '../style/main/index.module.css';
import MainPageFooter from '@/component/main/footer';
import MatchingButton from '@/component/main/matching-button';
import MainPageBody from '@/component/main/body';
import { MenuHeader } from '@/component/common/Header';
import FriendPage from '@/component/friend';
import React from 'react';

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
			<MenuHeader title={'친구'} position={'left'}>
				<FriendPage />
			</MenuHeader>
			<div className={style.container}>
				<MainPageBody />
				<MatchingButton />
				<MainPageFooter />
			</div>
		</>
	);
};

export default MainPage;
