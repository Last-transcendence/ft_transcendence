import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { User } from 'context/AuthContext';
import { EditProfileHeader } from './header';
import { EditProfileImage } from './image';
import axios from 'axios';
import { EditProfileStyle } from './index.style';
import { EditProfileInformation } from './information';
import { EditProfileButton } from './button';
import { toast } from 'react-toastify';
import { Member } from 'context/MemberContext';
import { Club } from 'context/ClubContext';

const handleSubmit = async (
	event: FormEvent<HTMLFormElement>,
	file: null | File,
	newMe: Partial<User>,
	setMe: Dispatch<SetStateAction<User | null>>,
	myNewMemberProfile: Partial<Member>,
	setMembers: Dispatch<SetStateAction<Member[] | null>>,
	club: Club,
	setIsModalOpened: Dispatch<SetStateAction<boolean>>,
) => {
	try {
		event.preventDefault();
		if (file) {
			const presignedData = await axios
				.post(
					`${process.env.REACT_APP_NESTJS_URL}/image/presigned/profile`,
					{},
					{ withCredentials: true },
				)
				.then(response => {
					return response.data;
				})
				.catch(error => {
					console.error(error);
					alert(error.response.data.message);
				});
			const formData = new FormData();

			for (const key in presignedData.fields) {
				formData.append(key, presignedData.fields[key]);
			}
			formData.append('Content-Type', file.type);
			formData.append('file', file);
			axios.post(presignedData.url, formData).catch(error => {
				throw new Error(error);
			});
			newMe.profileImageId = presignedData.fields.key.split('/')[2];
		}
		axios
			.patch(`${process.env.REACT_APP_NESTJS_URL}/user/me`, newMe, { withCredentials: true })
			.then(response => {
				setMe(response.data);
			})
			.catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
		axios
			.patch(
				`${process.env.REACT_APP_NESTJS_URL}/club/${club._id}/member/${myNewMemberProfile._id}`,
				myNewMemberProfile,
				{
					withCredentials: true,
				},
			)
			.then(response => {
				setMembers(response.data.members);
				toast.success(response.data.message);
			})
			.catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
	} catch (error) {
		console.error(error);
	}
	setIsModalOpened(false);
};

const MyProfileEditModal = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	members: Member[];
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
	club: Club;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, members, setMembers, club, setIsModalOpened } = props;
	const [file, setFile] = useState<null | File>(null);
	const [newMe, setNewMe] = useState<Partial<User>>({});
	const [myNewMemberProfile, setMyNewMemberProfile] = useState<Partial<Member>>({});
	const [isClicked, setIsClicked] = useState<boolean>(false);

	useEffect(() => {
		setNewMe({
			...me,
		});
		setMyNewMemberProfile({
			...members.find(member => member.userId === me._id),
		});
	}, [me, members]);

	return (
		<form
			className={EditProfileStyle}
			onSubmit={event => {
				setIsClicked(true);
				handleSubmit(
					event,
					file,
					newMe,
					setMe,
					myNewMemberProfile,
					setMembers,
					club,
					setIsModalOpened,
				);
			}}
		>
			<div>
				<EditProfileHeader />
				<div>
					<EditProfileImage me={me} setFile={setFile} />
					<EditProfileInformation
						me={me}
						newMe={newMe}
						setNewMe={setNewMe}
						members={members}
						myNewMemberProfile={myNewMemberProfile}
						setMyNewMemberProfile={setMyNewMemberProfile}
						club={club}
					/>
				</div>
				<EditProfileButton isClicked={isClicked} />
			</div>
		</form>
	);
};

export default MyProfileEditModal;
