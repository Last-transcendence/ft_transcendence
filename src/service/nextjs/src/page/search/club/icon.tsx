import React from 'react';

export const BackwardIcon = (props: {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}) => {
	const { width, height, onClick = undefined } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 30 29"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M20.6055 5L12.0197 13.5858C11.2386 14.3668 11.2386 15.6332 12.0197 16.4142L20.6055 25"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};
