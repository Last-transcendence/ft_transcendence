import { css } from '@emotion/css';

const HeaderStyle = css({
	height: 160,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: 20,

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
		display: 'flex',
		gap: 10,
		'> span': {
			fontFamily: 'Pretendard-regular',
		},
	},
});

const ReviewStyle = css({
	width: '100%',
	height: 64,
	display: 'grid',
	gridTemplateColumns: '64px 1fr 96px',
	gap: 30,
	marginBottom: 50,

	'> div:nth-child(1)': {
		backgroundColor: '#D9D9D9',
		borderRadius: '50%',
	},
	'> div:nth-child(2)': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 10,
		'> span': {
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
		},
	},
});

const ReviewsStyle = css({
	'> div:nth-child(1)': {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		'> div': {
			display: 'flex',
			alignItems: 'center',
			gap: 10,
			cursor: 'pointer',
			'> span': {
				fontSize: 20,
				fontFamily: 'Pretendard-regular',
			},
		},
	},

	'> div:nth-child(2)': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflowY: 'auto',
		margin: '30px 0',
		'> div': {
			width: '99%',
			height: 755,
			'> div': ReviewStyle,
		},
	},
});

const SearchClubPageReviewStyle = css({
	width: '95%',

	'> div': {
		padding: '0 30px',
	},

	'> div:nth-child(1)': HeaderStyle,
	'> div:nth-child(2)': ReviewsStyle,
});

export default SearchClubPageReviewStyle;
