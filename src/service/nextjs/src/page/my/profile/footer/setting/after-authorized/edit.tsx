import axios from 'axios';
import { User } from 'context/AuthContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { ProfileSettingEditCompletedStyle, ProfileSettingEditStyle } from './edit.style';
import { DoneIcon } from './icon';

const EditForm = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	setEditCompleted: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, setEditCompleted } = props;
	const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);
	const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
	const [newPasswordCheck, setNewPasswordCheck] = useState<string | undefined>(undefined);
	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement>,
		currentPassword: string | undefined,
		setCurrentPassword: Dispatch<SetStateAction<string | undefined>>,
		newPassword: string | undefined,
		setNewPassword: Dispatch<SetStateAction<string | undefined>>,
		newPasswordCheck: string | undefined,
		setNewPasswordCheck: Dispatch<SetStateAction<string | undefined>>,
		setEditCompleted: Dispatch<SetStateAction<boolean>>,
	) => {
		event.preventDefault();
		if (!currentPassword || !newPassword || !newPasswordCheck) {
			alert('모든 항목을 입력해주세요.');
			return;
		}
		if (newPassword !== newPasswordCheck) {
			alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
			setCurrentPassword('');
			setNewPassword('');
			setNewPasswordCheck('');
			return;
		}
		console.log(currentPassword, newPassword, newPasswordCheck);
		if (currentPassword === newPassword) {
			alert('현재 비밀번호와 새 비밀번호가 일치합니다.');
			setCurrentPassword('');
			setNewPassword('');
			setNewPasswordCheck('');
			return;
		}
		axios
			.patch(
				`${process.env.REACT_APP_NESTJS_URL}/user/me/password`,
				{ password: currentPassword, newPassword },
				{ withCredentials: true },
			)
			.then(response => {
				setMe({
					...me,
					password: response.data.password,
				});
				toast.success('비밀번호가 변경되었습니다.');
				setEditCompleted(true);
			})
			.catch(error => {
				console.error(error);
				alert('현재 비밀번호가 일치하지 않습니다.');
				setCurrentPassword('');
				setNewPassword('');
				setNewPasswordCheck('');
			});
	};

	return (
		<form
			onSubmit={event =>
				handleSubmit(
					event,
					currentPassword,
					setCurrentPassword,
					newPassword,
					setNewPassword,
					newPasswordCheck,
					setNewPasswordCheck,
					setEditCompleted,
				)
			}
		>
			<div>
				<span>현재 비밀번호</span>
				<input
					type="password"
					placeholder="현재 비밀번호"
					value={currentPassword}
					onChange={event => setCurrentPassword(event.target.value)}
				/>
			</div>
			<div>
				<span>새 비밀번호</span>
				<input
					type="password"
					placeholder="새 비밀번호"
					value={newPassword}
					onChange={event => setNewPassword(event.target.value)}
				/>
			</div>
			<div>
				<span>새 비밀번호 (확인)</span>
				<input
					type="password"
					placeholder="새 비밀번호 (확인)"
					value={newPasswordCheck}
					onChange={event => setNewPasswordCheck(event.target.value)}
				/>
			</div>
			<button type="submit">완료</button>
		</form>
	);
};

const EditCompleted = (props: { setIsModalOpened: Dispatch<SetStateAction<boolean>> }) => {
	const { setIsModalOpened } = props;

	setTimeout(() => {
		setIsModalOpened(false);
	}, 2000);

	return (
		<div className={ProfileSettingEditCompletedStyle}>
			<DoneIcon width={64} height={64} />
			<p>비밀번호가 수정되었습니다.</p>
		</div>
	);
};

const ProfileSettingEdit = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, setIsModalOpened } = props;
	const [editCompleted, setEditCompleted] = useState<boolean>(false);

	return (
		<div className={ProfileSettingEditStyle}>
			{editCompleted ? (
				<EditCompleted setIsModalOpened={setIsModalOpened} />
			) : (
				<EditForm me={me} setMe={setMe} setEditCompleted={setEditCompleted} />
			)}
		</div>
	);
};

export default ProfileSettingEdit;
