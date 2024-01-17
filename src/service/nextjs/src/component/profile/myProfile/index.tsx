import MyProfileBody from './myProfileBodys';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { useRouter } from 'next/router';

const MyProfilePage = () => {
	const router = useRouter();
	const onClick = () => {
		router.push('/profile/modifyProfile');
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
			<div style={{ position: 'relative' }}>
				<Header title={'마이프로필'} />
			</div>
			<div
				style={{
					width: '100%',
					position: 'absolute',
					top: '60px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<MyProfileBody image={me?.profileImageURI} name={me?.nickname} use2fa={me?.use2fa} />
			</div>
			<BottomButton title="프로필 수정하기" onClick={onClick} />
		</div>
	);
};

export default MyProfilePage;
