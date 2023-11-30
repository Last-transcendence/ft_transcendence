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

	// 원본
	//if (!file) {
	//	alert('파일을 선택해주세요.');
	//	return;
	//}

	setPageIndex(pageIndex + 1);

	// 부스 체험 용 validation
	if (!file) {
		return;
	}

	const presignedData = await axios
		.post(
			`${process.env.REACT_APP_NESTJS_URL}/image/presigned/card-slip`,
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

const AuditRegisterCardSlip = (props: {
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
					title={'카드 전표 등록'}
					subTitle={'STEP 2/3'}
					src={src}
					setSrc={setSrc}
					setFile={setFile}
				/>
			</form>
		</div>
	);
};

export default AuditRegisterCardSlip;
