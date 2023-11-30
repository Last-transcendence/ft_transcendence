import React from 'react';

const Description = (props: { setDescription: React.Dispatch<React.SetStateAction<string>> }) => {
	const { setDescription } = props;
	return (
		<div>
			<textarea
				onChange={e => {
					setDescription(e.target.value);
				}}
				placeholder="내용을 입력해주세요."
			/>
		</div>
	);
};

export default Description;
