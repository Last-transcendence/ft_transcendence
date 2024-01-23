import styles from '@/style/profile/myProfile/index.module.css';
import MyProfileBody from './myProfileBodys';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { useRouter } from 'next/router';
import Loading from '@/component/common/Loading';
import Me from '@/type/me.type';

const MyProfilePage = () => {
	const router = useRouter();
	const onClick = () => {
		router.push('/profile/modifyProfile');
	};

	const { me }: { me: Me | null } = useContext(AuthContext);
	return !me ? (
		<Loading />
	) : (
		<div className={styles['my-profile-index__body']}>
			<div className={styles['my-profile-index__relative']}>
				<Header title={'마이프로필'} />
			</div>
			<div className={styles['my-profile-index__absolute']}>
				<MyProfileBody image={me?.profileImageURI} name={me.nickname} use2fa={me?.use2fa} />
			</div>
			<BottomButton title="프로필 수정하기" onClick={onClick} />
		</div>
	);
};

export default MyProfilePage;
