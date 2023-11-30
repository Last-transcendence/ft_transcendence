import React, { useEffect, useState } from 'react';
import MemberProfileStyle from './index.style';
import { Member } from 'context/MemberContext';
import axios from 'axios';
import { User } from 'context/AuthContext';
import MemberProfileModal from './modal';
import { Modal } from 'component/modal';

const MemberProfile = (props: { member: Member }) => {
	const { member } = props;
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const src = userInfo
		? userInfo.profileImageId
			? `${process.env.REACT_APP_S3_BUCKET_URL}/profile/w512/${userInfo.profileImageId}`
			: undefined
		: undefined;
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/user/${member.userId}`, {
				withCredentials: true,
			})
			.then(response => {
				setUserInfo({
					_id: response.data._id,
					name: response.data.name,
					id: response.data.id,
					password: response.data.password,
					email: response.data.email,
					major: response.data.major,
					studentId: response.data.studentId,
					phoneNumber: response.data.phoneNumber,
					sns: response.data.sns,
					profileImageId: response.data.profileImageId,
					clubs: response.data.clubs,
				});
			});
	}, []);

	return (
		<>
			<div
				className={MemberProfileStyle}
				onClick={() => {
					setIsModalOpened(true);
				}}
			>
				<div>
					<img src={src} alt="profile" />
				</div>
				<div>
					<span>{userInfo?.name}</span>
					<span>|</span>
					<span>{member.role}</span>
				</div>
			</div>
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened}>
					<MemberProfileModal userInfo={userInfo} introduction={member.introduction} />
				</Modal>
			)}
		</>
	);
};

export default MemberProfile;
