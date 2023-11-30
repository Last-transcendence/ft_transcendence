import { css } from '@emotion/css';

export const ClubBtnModalStyle = css({
	position: 'absolute',
	top: -12.2,
	right: -17.5,
	width: 0,
	border: '1px solid black',
	borderRadius: 35,
	backgroundColor: '#EFEEEA',
	zIndex: 1000,

	'> div': {
		width: '88%',
		height: 70,
		margin: '0 auto',
		display: 'grid',
		alignItems: 'center',

		'> div:nth-child(1)': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			'> span': {
				fontSize: 18,
				fontFamily: 'Pretendard-regular',
			},
		},
		'> div:nth-child(2)': {
			'> div': {
				width: 46,
				height: 46,
				borderRadius: '70%',
			},
		},
	},

	'> div:last-child': {
		gridTemplateColumns: '1fr 56px',
		'> div': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		'> div:nth-child(1)': {
			height: 32,
			borderRight: '2px solid black',
			'> span': {
				lineHeight: 32,
			},
		},
	},
});

export const ClubBtnModalBtnStyle = css({
	gridTemplateColumns: '1fr auto',
	borderBottom: '1px solid black',
	cursor: 'pointer',

	'> div:nth-child(2)': {
		'> div': {
			border: '1px solid black',
			backgroundColor: '#D9D9D9',
		},
	},
});
