import React from 'react';
import MemberProfileModalStyle from './index.style';
import { User } from 'context/AuthContext';
import { InstagramIcon, PhoneNumberIcon } from './icon';

const FirstRow = (props: { userInfo: User | null }) => {
	const { userInfo } = props;
	const src = userInfo
		? userInfo.profileImageId
			? `${process.env.REACT_APP_S3_BUCKET_URL}/profile/w512/${userInfo.profileImageId}`
			: undefined
		: undefined;

	return (
		<div>
			<img src={src} alt="" />
			<div>
				<div>
					<div>
						<span>이름</span>
						<span>|</span>
						<span>{userInfo?.name}</span>
					</div>
					<div>
						<span>학과</span>
						<span>|</span>
						<span>{userInfo?.major}</span>
					</div>
					<div>
						<span>학번</span>
						<span>|</span>
						<span>{userInfo?.studentId}</span>
					</div>
				</div>
				<div>
					<div>
						<InstagramIcon width={25} height={27} />
						<PhoneNumberIcon width={25} height={27} />
					</div>
				</div>
			</div>
		</div>
	);
};

const SecondRow = (props: { introduction: string }) => {
	const { introduction } = props;

	return (
		<div>
			<div>
				<span>👋 소개</span>
			</div>
			<div>
				<span>{introduction}</span>
			</div>
		</div>
	);
};

const ThirdRow = () => {
	const percent = 65;
	const color = 90 <= percent ? 'white' : 'black';

	return (
		<div>
			<div>
				<span>🏆 동아리 참여율</span>
				<span>평균보다 많이 참여했어요!</span>
			</div>
			<div>
				<div>
					<div
						style={{
							width: `${percent}%`,
						}}
					></div>
					<span style={{ color }}>{percent}%</span>
				</div>
			</div>
		</div>
	);
};

const MemberProfileModal = (props: { userInfo: User | null; introduction: string }) => {
	const { userInfo, introduction } = props;

	return (
		<div className={MemberProfileModalStyle}>
			<div>
				<FirstRow userInfo={userInfo} />
				<SecondRow introduction={introduction} />
				<ThirdRow />
			</div>
		</div>
	);
};

export default MemberProfileModal;
