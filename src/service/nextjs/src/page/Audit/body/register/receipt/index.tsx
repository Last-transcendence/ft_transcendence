import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import AuditRegisterUploadForm from '../upload-form';
import axios from 'axios';

const handleSubmit = async (
	event: FormEvent<HTMLFormElement>,
	file: File | null,
	setFranchise: Dispatch<SetStateAction<string | undefined>>,
	setDate: Dispatch<SetStateAction<string | undefined>>,
	setAmount: Dispatch<SetStateAction<string | undefined>>,
	setId: Dispatch<SetStateAction<string | undefined>>,
	pageIndex: number,
	setPageIndex: Dispatch<SetStateAction<number>>,
) => {
	event.preventDefault();

	if (!file) {
		alert('파일을 선택해주세요.');
		return;
	}

	setPageIndex(pageIndex + 1);
	const presignedData = await axios
		.post(
			`${process.env.REACT_APP_NESTJS_URL}/image/presigned/receipt`,
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
	axios
		.post(
			`${process.env.REACT_APP_NESTJS_URL}/receipt`,
			{ imageId: presignedData.fields.key.split('/')[2] },
			{ withCredentials: true },
		)
		.then(response => {
			setDate(response.data.date);
			setAmount(response.data.amount);
			setFranchise(response.data.franchise);
		})
		.catch(error => {
			console.error(error);
			alert(error.response.data.message);
		});
};

const AuditRegisterReceipt = (props: {
	className: string;
	setFranchise: Dispatch<SetStateAction<string | undefined>>;
	setDate: Dispatch<SetStateAction<string | undefined>>;
	setAmount: Dispatch<SetStateAction<string | undefined>>;
	src: string | undefined;
	setSrc: Dispatch<SetStateAction<string | undefined>>;
	setId: Dispatch<SetStateAction<string | undefined>>;
	pageIndex: number;
	setPageIndex: Dispatch<SetStateAction<number>>;
}) => {
	const {
		className,
		setFranchise,
		setDate,
		setAmount,
		src,
		setSrc,
		setId,
		pageIndex,
		setPageIndex,
	} = props;
	const [file, setFile] = useState<File | null>(null);

	return (
		<div className={className}>
			<form
				onSubmit={event => {
					handleSubmit(
						event,
						file,
						setFranchise,
						setDate,
						setAmount,
						setId,
						pageIndex,
						setPageIndex,
					);
				}}
			>
				<AuditRegisterUploadForm
					title={'영수증 등록'}
					subTitle={'STEP 1/3'}
					src={src}
					setSrc={setSrc}
					setFile={setFile}
				/>
			</form>
		</div>
	);
};

export default AuditRegisterReceipt;
