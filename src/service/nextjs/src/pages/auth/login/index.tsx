import LoginBody from '@/component/auth/login';
import IsWithNotAuth from '@/component/common/accessControl/IsWithNotAuth';

const LoginPage = () => {
	return (
		<>
			<LoginBody />
		</>
	);
};

export default IsWithNotAuth(LoginPage);
