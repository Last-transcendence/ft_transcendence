import Head from 'next/head';
import style from '../style/main/index.module.css';
import MatchingButton from '@/component/main/matching-button';
import MainPageBody from '@/component/main/body';
import FriendPage from '@/component/friend';
import { BottomButton } from '@/component/common/ButtomButton';
import Link from 'next/link';
import { MenuHeader } from '@/component/common/Header';

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
				<MenuHeader title={'친구'} type={'friend'}>
					<FriendPage />
				</MenuHeader>
				<MainPageBody />
				<MatchingButton />
				<Link href={'/chat/create'}>
					<BottomButton title={'채널생성'} />
				</Link>
			</div>
		</>
	);
};

export default MainPage;
