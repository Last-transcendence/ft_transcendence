import React from 'react';

export const DivideLineIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 144 2"
			fill="none"
		>
			<path d={`M-15 1.26807 L${width} 1.26807`} stroke="#A7A7A7" />
		</svg>
	);
};
