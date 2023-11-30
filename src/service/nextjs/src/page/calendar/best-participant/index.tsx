import React, { useContext, useEffect, useState } from 'react';
import {
	BestParticipantBodyStyle,
	BestParticipantHeaderStyle,
	BestParticipantStyle,
} from './index.style';
import { AwardIcon, CrownIcon } from './icon';
import { Member, MemberContext } from 'context/MemberContext';
import { ProfileImage } from 'component/ProfileImage.component';
import axios from 'axios';
import { User } from 'context/AuthContext';

const Header = () => {
	return (
		<div className={BestParticipantHeaderStyle}>
			<CrownIcon width={40} height={40} />
			<span>이번 학기 참여왕</span>
		</div>
	);
};

const Body = (props: { members: Member[] | null }) => {
	const { members } = props;
	const sortedMembers = members?.sort((a, b) => {
		if (a.participation > b.participation) {
			return -1;
		} else if (a.participation < b.participation) {
			return 1;
		} else {
			return 0;
		}
	});
	const bestParticipant = sortedMembers?.[0];
	const [bestParticipantProfile, setBestParticipantProfile] = useState<User | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/user/${bestParticipant?.userId}`, {
				withCredentials: true,
			})
			.then(response => {
				setBestParticipantProfile(response.data);
			})
			.catch(() => {
				setBestParticipantProfile(null);
			});
	}, [bestParticipant]);

	return (
		<div className={BestParticipantBodyStyle}>
			<ProfileImage
				src={`${process.env.REACT_APP_S3_BUCKET_URL}/profile/w512/${bestParticipantProfile?.profileImageId}`}
				width={117}
				height={117}
				isCircle={true}
				className={null}
			/>
			<span>{bestParticipantProfile?.name}</span>
			<div>
				<AwardIcon width={30} height={30} />
				<span>{bestParticipant?.participation}회</span>
			</div>
		</div>
	);
};

const BestParticipant = () => {
	const { members } = useContext(MemberContext);

	return (
		<div className={BestParticipantStyle}>
			<Header />
			<Body members={members} />
		</div>
	);
};

export default BestParticipant;
