import ModifyMyProfile from '@/component/profile/modifyProfile';

const modifyProfile = () => {
	return (
		<>
			<ModifyMyProfile UserName={'choi'} TwoFAtureFalse={true} TwoFactorEmail={'rrrc'} />
		</>
	);
};

export default modifyProfile;
