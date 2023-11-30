import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import AuditRegisterUploadForm from '../upload-form';
import axios from 'axios';

const handleSubmit = async (
	event: FormEvent<HTMLFormElement>,
	file: File | null,
	setId: Dispatch<SetStateAction<string | undefined>>,
	pageIndex: number,
	setPageIndex: Dispatch<SetStateAction<number>>,
) => {
	event.preventDefault();

	setPageIndex(pageIndex + 1);

	if (!file) {
		return;
	}

	const presignedData = await axios
		.post(
			`${process.env.REACT_APP_NESTJS_URL}/image/presigned/attachment`,
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
	setId(presignedData.fields.key.split('/')[2]);
};

const AuditRegisterAttachment = (props: {
	className: string;
	src: string | undefined;
	setSrc: Dispatch<SetStateAction<string | undefined>>;
	setId: Dispatch<SetStateAction<string | undefined>>;
	pageIndex: number;
	setPageIndex: Dispatch<SetStateAction<number>>;
}) => {
	const { className, src, setSrc, setId, pageIndex, setPageIndex } = props;
	const [file, setFile] = useState<File | null>(null);

	return (
		<div className={className}>
			<form
				onSubmit={event => {
					handleSubmit(event, file, setId, pageIndex, setPageIndex);
				}}
			>
				<AuditRegisterUploadForm
					title={'첨부파일 등록'}
					subTitle={'STEP 3/3'}
					src={src}
					setSrc={setSrc}
					setFile={setFile}
				/>
			</form>
		</div>
	);
};

export default AuditRegisterAttachment;
