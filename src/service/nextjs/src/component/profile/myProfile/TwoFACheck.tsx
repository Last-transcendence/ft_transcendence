const TwoFACheck = ({ twoFA }: { twoFA: boolean | undefined }) =>
	twoFA === undefined ? (
		<div>2차 인증 : 로딩 실패</div>
	) : twoFA === true ? (
		<div>2차 인증 : 사용 중</div>
	) : (
		<div>2차 인증 : 사용 안함</div>
	);

export default TwoFACheck;
