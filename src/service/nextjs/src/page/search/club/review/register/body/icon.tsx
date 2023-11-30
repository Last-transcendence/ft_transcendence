import React from 'react';

export const EmptyStarIcon = (props: {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}) => {
	const { width, height, onClick } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M12.4995 2.08301L15.7328 9.09134L23.3974 10.0007L17.7307 15.2403L19.2349 22.8111L12.4995 19.0413L5.76406 22.8122L7.26823 15.2413L1.60156 9.99967L9.26719 9.0903L12.4995 2.08301Z"
				stroke="black"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
