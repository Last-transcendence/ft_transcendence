import { ProfileImage } from 'component/ProfileImage.component';
import React from 'react';
import { useRef, useState } from 'react';
import { EditProfileImageStyle } from './image.style';
import { User } from 'context/AuthContext';

const handleChange = async (
	event: React.ChangeEvent<HTMLInputElement>,
	setSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
	setFile: React.Dispatch<React.SetStateAction<null | File>>,
) => {
	if (!event.target.files || !event.target.files[0]) {
		setFile(null);
		return;
	}

	const file = event.target.files[0];

	setFile(file);

	try {
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			setSrc(fileReader.result as string);
		};
	} catch (error) {
		console.error(error);
	}
};

const ImageSelector = (props: {
	src: string | undefined;
	setSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
	setFile: React.Dispatch<React.SetStateAction<null | File>>;
}) => {
	const { setFile, src, setSrc } = props;
	const spanText = !src ? '추가' : '수정';
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				accept="image/*"
				onChange={event => handleChange(event, setSrc, setFile)}
			/>
			<span
				onClick={() => {
					if (fileInputRef.current) {
						fileInputRef.current.click();
					}
				}}
			>
				{spanText}
			</span>
		</>
	);
};

const Header = (props: {
	src: string | undefined;
	setSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
	setFile: React.Dispatch<React.SetStateAction<null | File>>;
}) => {
	const { src, setSrc, setFile } = props;

	return (
		<div>
			<span>프로필 사진</span>
			<ImageSelector src={src} setSrc={setSrc} setFile={setFile} />
		</div>
	);
};

const PreviewImage = (props: { src: string | undefined }) => {
	const { src } = props;

	return (
		<div>
			<ProfileImage src={src} width={196} height={196} isCircle={true} className={null} />
		</div>
	);
};

export const EditProfileImage = (props: {
	me: User;
	setFile: React.Dispatch<React.SetStateAction<null | File>>;
}) => {
	const { me, setFile } = props;
	if (!me) {
		return null;
	}

	const [src, setSrc] = useState<string | undefined>(
		me.profileImageId
			? `${process.env.REACT_APP_S3_BUCKET_URL}/profile/raw/${me.profileImageId}`
			: undefined,
	);

	return (
		<div className={EditProfileImageStyle}>
			<Header src={src} setSrc={setSrc} setFile={setFile} />
			<PreviewImage src={src} />
		</div>
	);
};
