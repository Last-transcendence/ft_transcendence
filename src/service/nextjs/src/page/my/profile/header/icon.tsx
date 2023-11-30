import React from 'react';

export const HumanIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 29 30"
			fill="none"
		>
			<path
				d="M28 29C28 21.2677 21.9562 15 14.5 15C7.04383 15 1 21.2677 1 29H28Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.5 15C18.6421 15 22 11.866 22 8C22 4.13401 18.6421 1 14.5 1C10.3579 1 7 4.13401 7 8C7 11.866 10.3579 15 14.5 15Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const EditIcon = (props: {
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
			viewBox="0 0 19 20"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M1.10071 18.3963L1.10393 18.3995C1.18955 18.4858 1.29136 18.5543 1.40352 18.601C1.51569 18.6478 1.63599 18.6719 1.7575 18.672C1.85976 18.6719 1.9613 18.6551 2.05809 18.6221L7.32784 16.8345L17.4401 6.72215C18.0583 6.10391 18.4056 5.2654 18.4056 4.39111C18.4055 3.51682 18.0582 2.67835 17.4399 2.06016C16.8217 1.44196 15.9832 1.09469 15.1089 1.09473C14.2346 1.09476 13.3961 1.44211 12.7779 2.06036L2.66564 12.1727L0.87816 17.4423C0.821854 17.6061 0.812867 17.7826 0.852228 17.9513C0.89159 18.12 0.977707 18.2743 1.10071 18.3963ZM13.6177 2.90003C14.0137 2.50702 14.5494 2.28695 15.1073 2.28802C15.6653 2.2891 16.2 2.51122 16.5946 2.90575C16.9891 3.30028 17.2112 3.83508 17.2123 4.39302C17.2133 4.95097 16.9932 5.4866 16.6002 5.88263L15.2704 7.2124L12.2878 4.22981L13.6177 2.90003ZM3.70137 12.8163L11.4482 5.06948L14.4308 8.05208L6.68392 15.7989L2.17016 17.3301L3.70137 12.8163Z"
				fill="black"
			/>
		</svg>
	);
};
