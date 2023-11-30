import { css } from '@emotion/css';

const FirstRowDescription = css({
	margin: '40px 0',
	padding: '30px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',

	'> div': {
		'> span': {
			fontFamily: 'Pretendard-regular',
		},
	},
	'> div:nth-child(1)': {
		display: 'flex',
		alignItems: 'center',
		gap: 20,
		'> span': {
			fontSize: 20,
		},
	},
	'> div:nth-child(2)': {
		'> span': {
			fontSize: 24,
		},
	},
});

const FirstRow = css({
	height: 240,
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	borderBottom: '1px solid black',

	'> div': FirstRowDescription,
	'> div:nth-child(-n+3)': {
		borderRight: '1px solid black',
	},
});

const SecondRow = css({
	height: 360,
	display: 'grid',
	gridTemplateRows: '3fr 1fr',

	'> div:nth-child(1)': {
		display: 'flex',
		flexDirection: 'column',
		gap: 30,
		margin: '40px 0',

		'> div': {
			'> span': {
				fontSize: 20,
			},
		},
		'> div:nth-child(1)': {
			'> span': {
				fontFamily: 'Pretendard-medium',
			},
		},
		'> div:nth-child(2)': {
			'> span': {
				fontFamily: 'Pretendard-regular',
			},
		},
	},
	'> div:nth-child(2)': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '40px 0',
		gap: 50,

		'> div': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 10,
			'> span': {
				fontSize: 20,
				fontFamily: 'Pretendard-regular',
			},
			'> svg': {
				cursor: 'pointer',
			},
		},
	},
});

const SearchClubPageDescriptionStyle = css({
	height: 600,
	borderBottom: '1px solid black',

	'> div:nth-child(n+2)': {
		padding: '0 30px',
	},

	'> div:nth-child(1)': FirstRow,
	'> div:nth-child(2)': SecondRow,
});

export default SearchClubPageDescriptionStyle;
