import React from 'react';

export const DoneIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 90 88"
			fill="none"
		>
			<path
				d="M87.8706 44.0303C87.8706 67.4751 68.6731 86.506 44.9607 86.506C21.2483 86.506 2.05078 67.4751 2.05078 44.0303C2.05078 20.5855 21.2483 1.55469 44.9607 1.55469C68.6731 1.55469 87.8706 20.5855 87.8706 44.0303Z"
				stroke="#14AE5C"
				strokeWidth="3"
			/>
			<path d="M20.0859 42.6142L39.7247 58.991L71.8276 29.0723" stroke="#14AE5C" strokeWidth="3" />
		</svg>
	);
};
