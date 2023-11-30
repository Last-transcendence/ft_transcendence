import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { AuditRegisterUploadFormStyle } from './index.style';
import { DownloadIcon } from './icon';

const AuditRegisterUploadForm = (props: {
	title: string;
	subTitle: string;
	src: string | undefined;
	setSrc: Dispatch<SetStateAction<string | undefined>>;
	setFile: Dispatch<SetStateAction<File | null>>;
}) => {
	const { title, subTitle, src, setSrc, setFile } = props;
	const imageSelectHandler = (
		event: ChangeEvent<HTMLInputElement>,
		setFile: Dispatch<SetStateAction<File | null>>,
		setSrc: Dispatch<SetStateAction<string | undefined>>,
	) => {
		if (!event.target.files || !event.target.files[0]) {
			return;
		}

		const imageFile = event.target.files[0];

		setFile(imageFile);
		try {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(imageFile);
			fileReader.onload = () => {
				setSrc(fileReader.result as string);
			};
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={AuditRegisterUploadFormStyle}>
			<div>
				<div>
					<span>{title}</span>
					<span>{subTitle}</span>
				</div>
				<div>
					{src ? (
						<img src={src} />
					) : (
						<div>
							<DownloadIcon width={30} height={30} />
							<span>이미지 첨부</span>
						</div>
					)}
					<input
						id="image"
						type="file"
						accept="image/*"
						onChange={event => {
							imageSelectHandler(event, setFile, setSrc);
						}}
					/>
				</div>
			</div>
			<button type="submit">
				<span>다 음</span>
			</button>
		</div>
	);
};

export default AuditRegisterUploadForm;
