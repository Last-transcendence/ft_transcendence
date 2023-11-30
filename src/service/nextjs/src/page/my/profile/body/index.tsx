import { ProfileImage } from 'component/ProfileImage.component';
import { User } from 'context/AuthContext';
import { Club } from 'context/ClubContext';
import { Member } from 'context/MemberContext';
import React from 'react';
import MyPageProfileBodyStyle from './index.style';
import {
	ClubIcon,
	EmailIcon,
	InstagramIcon,
	MajorIcon,
	PhoneNumberIcon,
	SchoolIcon,
	StudentIdIcon,
} from './icon';

const Profile = (props: {
	src: string | undefined;
	name: string;
	introduction: string | undefined;
}) => {
	const { src, name, introduction } = props;

	return (
		<div>
			<ProfileImage src={src} width={128} height={128} isCircle={true} className={null} />
			<div>
				<span>{name}</span>
				<span>{introduction}</span>
			</div>
		</div>
	);
};

const Information = (props: {
	icon: JSX.Element | null;
	type: string;
	value: string | undefined;
}) => {
	const { icon, type, value } = props;

	return (
		<div>
			<div>
				{icon}
				<span>{type}</span>
			</div>
			<span>{value}</span>
		</div>
	);
};

const Informations = (props: { me: User; clubName: string | undefined }) => {
	const { me, clubName } = props;

	return (
		<div>
			<Information icon={<EmailIcon width={22} height={22} />} type="이메일" value={me.email} />
			<Information icon={<SchoolIcon width={22} height={22} />} type="학교" value={'국민대학교'} />
			<Information icon={<MajorIcon width={22} height={22} />} type="학과" value={me.major} />
			<Information
				icon={<StudentIdIcon width={22} height={22} />}
				type="학번"
				value={me.studentId}
			/>
			<Information icon={<ClubIcon width={22} height={22} />} type="동아리" value={clubName} />
			<Information
				icon={<PhoneNumberIcon width={22} height={22} />}
				type="전화번호"
				value={me.phoneNumber}
			/>
			<Information
				icon={<InstagramIcon width={22} height={22} />}
				type="인스타그램"
				value={me.sns}
			/>
		</div>
	);
};

const MyPageProfileBody = (props: { me: User; members: Member[] | null; club: Club }) => {
	const { me, members, club } = props;
	const src = me.profileImageId
		? `${process.env.REACT_APP_S3_BUCKET_URL}/profile/w512/${me.profileImageId}`
		: undefined;
	const myMemberProfile = members?.find(member => member.userId === me._id);

	return (
		<div className={MyPageProfileBodyStyle}>
			<Profile src={src} name={me.name} introduction={myMemberProfile?.introduction} />
			<Informations me={me} clubName={club.name} />
		</div>
	);
};

export default MyPageProfileBody;
