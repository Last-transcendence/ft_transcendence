import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import { useState } from 'react';
import Index from './index';
import ProfileModar from '@/component/profile/profileModar';
import ProfileMenus from '@/component/profile/profileMenus';

const UserProfile = () => {
	const [click, setClick] = useState(false);

	const handleAvatarClick = () => {
		setClick(true);
	};

	return (
		<Container maxWidth="xs">
			<Avatar alt="User Avatar" onClick={handleAvatarClick} />
			{click && (
				<ProfileModar setClick={setClick} childMenu={<ProfileMenus />}>
					<Index />
				</ProfileModar>
			)}
		</Container>
	);
};

export default UserProfile;
