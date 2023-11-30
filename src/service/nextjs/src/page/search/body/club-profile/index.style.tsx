import { css } from '@emotion/css';

const HeaderStyle = css({
	height: 100,
	display: 'flex',
	alignItems: 'center',
	gap: 15,
	'> span': {
		fontSize: 16,
		fontFamily: 'Pretendard-regular',
	},
	'> svg': {
		cursor: 'pointer',
		marginTop: 2,
	},
});

const ClubProfileDescriptionStyle = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 10,
	'> *': {
		width: '80%',
	},
	'> div:nth-child(1)': {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		'> span': {
			fontSize: 20,
			fontFamily: 'Pretendard-medium',
		},
	},
	'> span': {
		fontSize: 16,
		fontFamily: 'Pretendard-regular',
	},
});

const ClubProfileStyle = css({
	width: '100%',
	height: 300,
	display: 'grid',
	gridTemplateRows: '210px auto',
	border: '1px solid black',
	cursor: 'pointer',

	'&:hover': {
		outline: '5px auto -webkit-focus-ring-color',
	},
	'&:active': {
		outline: 'none',
	},

	'> div:nth-child(1)': {
		backgroundColor: '#D9D9D9',
		borderBottom: '1px solid black',
	},
	'> div:nth-child(2)': ClubProfileDescriptionStyle,
});

const BodyStyle = css({
	overflowY: 'auto',

	'> div': {
		width: '99%',
		height: 620,
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
		gap: 13,

		'> div': ClubProfileStyle,
	},
});

const SearchPageBodyClubProfileStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	'> div': {
		width: '100%',
	},

	'> div:nth-child(1)': HeaderStyle,
	'> div:nth-child(2)': BodyStyle,
});

export default SearchPageBodyClubProfileStyle;
