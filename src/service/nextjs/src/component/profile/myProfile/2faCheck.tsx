const TwoFACheck = ({ twoFA }: { twoFA: boolean }) =>
	twoFA === true ? <p>2차 인증 사용 중</p> : <p>2차 인증 사용 안함</p>;

export default TwoFACheck;
