import MyProfileBody from './myProfileBodys';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { useRouter } from 'next/router';

const MyProfilePage = () => {
	const router = useRouter();
	const onClick = () => {
		router.push('/profile/testModifyProfile');
	};
	const { me } = useContext(AuthContext);
	console.log(me?.nickname);
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'column',
			}}
		>
			<Header title={'마이프로필'} />
			<MyProfileBody image={me?.profileImageURI} name={me?.nickname} use2fa={me?.use2fa} />
			<BottomButton title="수정" onClick={onClick} />
		</div>
	);
};

export default MyProfilePage;
