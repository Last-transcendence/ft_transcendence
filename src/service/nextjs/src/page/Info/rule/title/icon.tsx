import React from 'react';

export const InfoPageTitleIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 209 60"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5139 0H209L204.646 7.25694L209 13.7882L204.646 21.7708L209 29.7535L204.646 37.0104L209 43.5417L204.646 50.7986L209 59.5069L194.486 59.507H0L4.35417 50.7987L0 43.5417L4.35417 37.0105L0 29.7535L4.35417 21.7709L0 13.7882L4.35417 7.257L0 5.42535e-05H14.5139V0Z"
				fill="black"
			/>
		</svg>
	);
};
