import { css } from '@emotion/css';

export const eventStyle = css`
	background-color: transparent;
	border: none;
	color: #333;
	font-size: 0.8rem;
	margin-bottom: 2px;

	& .fc-event-dot {
		display: inline-block;
		margin-right: 5px;
		border-color: #333;
	}
`;
// fc-col-header-cell-cushion before : 일월화수목금토 -> after : Sun Mon Tue Wed Thu Fri Sat 로 변경
export const headerStyle = css`
	background-color: transparent;
	border: none;
	color: #333;
	font-size: 0.8rem;
	font-family: 'pretendard-bold';

	&.fc-theme-standard td{
		border: none;
	}
	&.fc-col-header-cell {
		font-size: 0;
		font-family: 'pretendard-bold';
		border: none;
		padding-bottom: 40px;
	}

	&.fc-col-header-cell: nth-child(1): after {
		font-size: 20px;
		content: 'SUN';
		font-family: 'pretendard-regular';
	}

	&.fc-col-header-cell: nth-child(2): after {
		font-size: 20px;
		content: 'MON';
		font-family: 'pretendard-regular';

	}
	&.fc-col-header-cell: nth-child(3): after {
		font-size: 20px;
		content: 'TUE';
		font-family: 'pretendard-regular';
	}
	&.fc-col-header-cell: nth-child(4): after {
		font-size: 20px;
		content: 'WED';
		font-family: 'pretendard-regular';
	}
	&.fc-col-header-cell: nth-child(5): after {
		font-size: 20px;
		content: 'THU';
		font-family: 'pretendard-regular';
	}
	&.fc-col-header-cell: nth-child(6): after {
		font-size: 20px;
		content: 'FRI';
		font-family: 'pretendard-regular';
	}
	&.fc-col-header-cell: nth-child(7): after {
		font-size: 20px;
		content: 'SAT';
		font-family: 'pretendard-regular';
	}
	&.fc-daygrid-day{
		border: none !important;
	}
}

`;

export const buttonStyle = css`
	background-color: #fff;
	border: 1px solid #ccc;
	color: #333;

	&:hover {
		background-color: #f5f5f5;
	}

	&:active,
	&.fc-button-active {
		background-color: #e5e5e5;
	}
`;

export const toolbarStyle = css`
	padding: 10px 0;

	& .fc-toolbar-title {
		font-size: 1.2rem;
		font-weight: bold;
	}
`;

export const dayNumberStyle = css`
	.fc-daygrid-day-top {
		justify-content: left;
	}

	.day-number {
		font-size: 20px;
		font-family: 'pretendard-regular';
	}
`;

export const globalStyles = css`
	.fc-scrollgrid,
	.fc-theme-standard td,
	.fc-theme-standard th,
	.fc-scrollgrid-sync-table tr,
	.fc-scrollgrid-sync-table td,
	.fc-scrollgrid-sync-table th {
		border: none !important;
	}
	padding: 10px;
`;
