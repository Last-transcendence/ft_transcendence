import React from 'react';
import { EditProfileButtonStyle } from './button.style';

export const EditProfileButton = (props: { isClicked: boolean }) => {
	const { isClicked } = props;

	return (
		<div className={EditProfileButtonStyle}>
			<button type="submit" disabled={isClicked}>
				수정하기
			</button>
		</div>
	);
};
