import React from 'react';
export const CloseIcon = (props: {
	width: number | string;
	height: number | string;
	onClick: (() => void) | undefined;
}) => {
	const { width, height, onClick } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 35 38"
			onClick={onClick}
			fill="none"
		>
			<path
				d="M17.4996 16.6092L24.7183 8.84277L26.7804 11.0613L19.5617 18.8278L26.7804 26.5942L24.7183 28.8128L17.4996 21.0463L10.2808 28.8128L8.21875 26.5942L15.4375 18.8278L8.21875 11.0613L10.2808 8.84277L17.4996 16.6092Z"
				fill="white"
			/>
		</svg>
	);
};
