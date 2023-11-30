import React from 'react';

export const DownloadIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				d="M18.6836 15.0938V18.0938H6.68359V15.0938H4.68359V18.0938C4.68359 19.1938 5.58359 20.0938 6.68359 20.0938H18.6836C19.7836 20.0938 20.6836 19.1938 20.6836 18.0938V15.0938H18.6836ZM17.6836 11.0938L16.2736 9.68375L13.6836 12.2638V4.09375H11.6836V12.2638L9.09359 9.68375L7.68359 11.0938L12.6836 16.0938L17.6836 11.0938Z"
				fill="black"
			/>
		</svg>
	);
};
