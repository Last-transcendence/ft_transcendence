import { css } from '@emotion/css';

export const datePickerStyle = css`
	.react-datepicker {
		width: 352px;
		height: 333px;
		background-color: transparent;
		border: none;
		border-top: 1px solid black;
	}

	//always today's date background color change to gray
	.react-datepicker__day--today {
		background-color: transparent;
	}
	.react-datepicker__day--today: hover {
		background-color: transparent;
	}

	// selected start date and end date color change to black, and change margin's color to black
	.react-datepicker__day--selected,
	.react-datepicker__day--in-selecting-range,
	.react-datepicker__day--in-range {
		background-color: black;
		color: white;
		border-color: black;
	}

	// only transparent not selected date
	.react-datepicker__day--keyboard-selected:not(.react-datepicker__day--in-selecting-range):not(
			.react-datepicker__day--in-range
		) {
		background-color: transparent;
		color: black;
	}

	// fix the problem that the selected current month's end date and next month's date's what is same date color

	.react-datepicker__day--in-selecting-range:last-child,
	.react-datepicker__day--in-range:last-child,
	.react-datepicker__day--selected:last-child {
		background-color: black;
		color: white;
		border-color: black;
	}

	// when selecting start date, end date color change to black
	.react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range) {
		background-color: black;
		color: white;
	}

	// after selected start date, end date then hover color change to black
	.react-datepicker__day--in-range:hover {
		background-color: black;
		color: white;
	}

	.react-datepicker__navigation {
		margin-left: 20px; /* 왼쪽 여백을 줄임 */
		margin-right: 20px; /* 오른쪽 여백을 줄임 */
	}

	.react-datepicker__month-container {
		width: 352px;
		/* 최대 높이 설정 */
		max-height: 400px;
		background-color: transparent;
		overflow: hidden; /* 내용이 벗어나면 숨김 */
	}

	.react-datepicker__current-month {
		padding-bottom: 10px;
	}

	.react-datepicker__week {
		width: 340px;
		/* 유동적인 높이 설정 */
		height: calc(100% / 6);
		min-height: 42px; /* 최소 높이 설정 */
		max-height: 50px; /* 최대 높이 설정 */
	}

	.react-datepicker__header {
		background-color: transparent;
		border-bottom: none;
		padding-top: 20px;
		padding-bottom: 3px;
	}

	// adjust react-datepicker__header's height and react-datepicker__navigation--next, react-datepicker__navigation--previous's padding-top
	.react-datepicker__navigation--next,
	.react-datepicker__navigation--previous {
		top: 15px;
	}
	.react-datepicker__day-name {
		width: 40px;
		font-size: 0;
	}
	/* 기존 요일 이름을 숨김 */
	.react-datepicker__day-name:nth-child(1)::after {
		content: 'SUN';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(2)::after {
		content: 'MON';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(3)::after {
		content: 'TUE';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(4)::after {
		content: 'WED';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(5)::after {
		content: 'THU';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(6)::after {
		content: 'FRI';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-name:nth-child(7)::after {
		content: 'SAT';
		font-size: 16px;
		color: gray;
	}

	.react-datepicker__day-names {
		margin-top: 10px;
		font-color: gray;
		font-size: 16px;
	}
	.react-datepicker__day {
		font-size: 16px;
		height: 24px;
		width: 40px;
		margin: 5px 5px 1px 1px;
	}
	.react-datepicker__day--outside-month {
		color: #a9a9a9;
	}
`;

export const DateTitleStyle = css({
	width: '75%',
	alignItems: 'center',
	paddingTop: '40px',
	paddingBottom: '70px',

	'> div: nth-child(1)': {
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		gap: '15px',
		fontFamily: 'Pretendard-bold',
		marginBottom: '45px',
	},
	'> div: nth-child(2)': {
		padding: '15px',
		fontFamily: 'Pretendard-bold',
		fontSize: '20px',
	},
});

export const DateContainerStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	borderRight: '1px solid black',
});
