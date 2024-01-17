const TwoFACheck = ({ twoFA }: { twoFA: boolean | undefined }) =>
	twoFA === undefined ? (
		<p>2차 인증 : 로딩 실패</p>
	) : twoFA === true ? (
		<p>2차 인증 : 사용 중</p>
	) : (
		<p>2차 인증 : 사용 안함</p>
	);

export default TwoFACheck;
