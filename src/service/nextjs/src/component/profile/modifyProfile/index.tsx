import { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box } from '@mui/material';
import ModifyID from './modifyID';
import Modify2FA from './modify2FA';
import CustomSnackbar from './customSnackbar';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { patchFetcher } from '../../../service/api';

const SUCCESS_MESSAGE: string = '변경 사항이 성공적으로 저장되었습니다.';
const FAIL_MESSAGE: string = '저장에 실패했습니다.';

interface EditProfileProps {
	UserName: string;
	TwoFAtureFalse: boolean;
	TwoFactorEmail: string;
}

const ModifyMyProfile = ({ UserName, TwoFAtureFalse, TwoFactorEmail }: EditProfileProps) => {
	const router = useRouter();
	const [userName, setUsername] = useState(UserName);
	const [twoFactorState, setTwoFactorState] = useState(TwoFAtureFalse);
	const [twoFactorEmail, setTwoFactorEmail] = useState(TwoFactorEmail);
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [showFailSnackbar, setShowFailSnackbar] = useState(false);

	const handleSaveChanges = async () => {
		const id = userName;
		const use2fa = twoFactorState;
		const email2fa = twoFactorEmail;
		try {
			const response = await patchFetcher<any>('/user/me', {
				id,
				use2fa,
				email2fa,
			});

			if (response.status === 200 || response.status === 201) {
				setShowSuccessSnackbar(true);
				setTimeout(() => {
					router.reload();
				}, 1000);
				router.push('/profile/testDetailProfile');
			} else {
				console.error('프로필 업데이트 에러:', response.status);
			}
		} catch (error) {
			setShowFailSnackbar(true);
			setTimeout(() => {
				router.reload();
			}, 1000);
			// 타임아웃 에러
		}
	};

	const handleToggleTwoFactorState = () => {
		setTwoFactorState(!twoFactorState);
		if (!twoFactorState) {
			setTwoFactorEmail(twoFactorEmail);
		}
	};

	const handleCloseMessage = () => {
		setShowSuccessSnackbar(false);
		setShowFailSnackbar(false);
	};

	return (
		<>
			<Stack justifyContent={'space-between'} height="100%">
				<Header title={'프로필 수정'} />
				<CustomSnackbar
					open={showSuccessSnackbar}
					onClose={handleCloseMessage}
					message={SUCCESS_MESSAGE}
					success={true}
				/>
				<CustomSnackbar
					open={showFailSnackbar}
					onClose={handleCloseMessage}
					message={FAIL_MESSAGE}
					success={false}
				/>
				<Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
					<ModifyID value={userName} onChange={setUsername} />
					<Modify2FA
						checked={twoFactorState}
						onToggle={handleToggleTwoFactorState}
						email={twoFactorEmail}
						onEmailChange={setTwoFactorEmail}
					/>
				</Box>
				<BottomButton title={'변경 사항 저장'} onClick={handleSaveChanges} />
			</Stack>
		</>
	);
};

export default ModifyMyProfile;
