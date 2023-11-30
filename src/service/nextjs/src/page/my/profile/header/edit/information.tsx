import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { EditProfileInformationStyle } from './information.style';
import { User } from 'context/AuthContext';
import { Club } from 'context/ClubContext';
import { Member } from 'context/MemberContext';
import {
	ClubIcon,
	EmailIcon,
	InstagramIcon,
	MajorIcon,
	PhoneNumberIcon,
	SchoolIcon,
	StudentIdIcon,
} from '../../body/icon';

const Header = () => {
	return (
		<div>
			<span>개인 정보</span>
		</div>
	);
};

const Information = (props: {
	icon: JSX.Element;
	label: string;
	info: string;
	setInfo: null | Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { icon, label, info, setInfo } = props;
	let inputForm = null;

	if (setInfo) {
		if (label === '소개') {
			inputForm = (
				<textarea
					value={info}
					onChange={event => {
						setInfo(event.target.value);
					}}
					style={{
						textAlign: 'left',
						height: '32px',
						resize: 'none',
						fontFamily: 'Pretendard-regular',
						fontSize: '14px',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						overflowWrap: 'break-word',
					}}
				/>
			);
		} else {
			inputForm = (
				<input
					type="text"
					value={info}
					onChange={event => {
						setInfo(event.target.value);
					}}
				/>
			);
		}
	} else {
		inputForm = <span>{info}</span>;
	}

	return (
		<div>
			{icon}
			<span>{label}</span>
			{inputForm}
		</div>
	);
};

export const EditProfileInformation = (props: {
	me: User;
	newMe: Partial<User>;
	setNewMe: Dispatch<SetStateAction<Partial<User>>>;
	members: Member[];
	myNewMemberProfile: Partial<Member>;
	setMyNewMemberProfile: Dispatch<SetStateAction<Partial<Member>>>;
	club: Club;
}) => {
	const { me, newMe, setNewMe, members, myNewMemberProfile, setMyNewMemberProfile, club } = props;
	const divRef = useRef<HTMLDivElement>(null);
	const [name, setName] = useState<string>(me.name);
	const email = me.email;
	const univ = '국민대학교';
	const [major, setMajor] = useState<string | undefined>(me.major);
	const [studentId, setStudentId] = useState<string | undefined>(me.studentId);
	const [phoneNumber, setPhoneNumber] = useState<string | undefined>(me.phoneNumber);
	const [sns, setSns] = useState<string | undefined>(me.sns);
	const [introduction, setIntroduction] = useState<string | undefined>(
		members.find(member => member.userId === me._id)?.introduction,
	);

	useEffect(() => {
		setNewMe({
			...newMe,
			name,
			major,
			studentId,
			phoneNumber,
			sns,
		});
		//if (divRef.current) {
		//	const elements = divRef.current.querySelectorAll('span:nth-child(3), input:nth-child(3)');
		//	let spanMaxWidth = 0,
		//		inputMaxWidth = 0;

		//	elements.forEach(element => {
		//		if (element instanceof HTMLSpanElement) {
		//			spanMaxWidth = Math.max(spanMaxWidth, element.clientWidth);
		//		} else if (element instanceof HTMLInputElement) {
		//			inputMaxWidth = Math.max(inputMaxWidth, element.clientWidth);
		//		} else {
		//			throw new Error('Unexpected element');
		//		}
		//	});
		//	elements.forEach(element => {
		//		if (element instanceof HTMLInputElement) {
		//			if (spanMaxWidth < inputMaxWidth) {
		//				element.setAttribute('style', `width: ${inputMaxWidth}px`);
		//			} else {
		//				element.setAttribute('style', `width: ${spanMaxWidth - 4}px`);
		//			}
		//		}
		//	});
		//}
	}, [name, major, studentId, phoneNumber, sns]);

	useEffect(() => {
		setMyNewMemberProfile({
			...myNewMemberProfile,
			introduction,
		});
	}, [introduction]);

	return (
		<div className={EditProfileInformationStyle} ref={divRef}>
			<Header />
			<Information
				icon={<EmailIcon width={20} height={20} />}
				label="이름"
				info={name}
				setInfo={setName}
			/>
			<Information
				icon={<EmailIcon width={20} height={20} />}
				label="이메일"
				info={email}
				setInfo={null}
			/>
			<Information
				icon={<SchoolIcon width={20} height={20} />}
				label="학교"
				info={univ}
				setInfo={null}
			/>
			<Information
				icon={<ClubIcon width={20} height={20} />}
				label="동아리"
				info={club?.name || ''}
				setInfo={null}
			/>
			<Information
				icon={<MajorIcon width={20} height={20} />}
				label="학과"
				info={major || ''}
				setInfo={setMajor}
			/>
			<Information
				icon={<StudentIdIcon width={20} height={20} />}
				label="학번"
				info={studentId || ''}
				setInfo={setStudentId}
			/>
			<Information
				icon={<PhoneNumberIcon width={20} height={20} />}
				label="전화번호"
				info={phoneNumber || ''}
				setInfo={setPhoneNumber}
			/>
			<Information
				icon={<InstagramIcon width={20} height={20} />}
				label="인스타그램"
				info={sns || ''}
				setInfo={setSns}
			/>
			<Information
				icon={<InstagramIcon width={20} height={20} />}
				label="소개"
				info={introduction || ''}
				setInfo={setIntroduction}
			/>
		</div>
	);
};
