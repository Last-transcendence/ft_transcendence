import { css } from '@emotion/css';

const TagStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 45,
	padding: '30px 0',

	'> *': {
		width: '80%',
	},
	'> div:nth-child(1)': {
		display: 'flex',
		alignItems: 'center',

		'> span': {
			fontSize: 20,
			fontFamily: 'Pretendard-medium',
		},
		gap: 15,
	},
});

const TagsStyle = css({
	height: 530,
	borderBottom: '1px solid black',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': {
		width: '95%',
		height: '80%',
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',

		'> div': TagStyle,
		'> div:not(:last-child)': {
			borderRight: '1px solid black',
		},
		'> div:first-child': {
			'> div:nth-child(2)': {
				display: 'flex',
				alignItems: 'center',
				gap: 10,
			},
		},
		'> div:not(:first-child)': {
			'> div:nth-child(2)': {
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 20,

				'> button': {
					width: '100%',
					height: 45,
					fontSize: 20,
					fontFamily: 'Pretendard-regular',
					border: '1px solid black',
					borderRadius: 5,
				},
			},
		},
	},
});

const ReviewStyle = css({
	height: 360,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 30,

	'> *': {
		width: '95%',
	},
	'> div': {
		height: 30,
		display: 'flex',
		alignItems: 'center',
		gap: 10,

		'> span': {
			fontSize: 20,
			fontFamily: 'Pretendard-medium',
		},
		'> span:nth-child(2)': {
			opacity: 0.5,
		},
	},
	'> textarea': {
		height: 210,
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
		border: 'none',
		resize: 'none',
		overflow: 'auto',
		backgroundColor: 'transparent',
		'&:focus': {
			outline: 'none',
		},
	},
});

const RegisterReviewClubSearchPageBodyStyle = css({
	height: 890,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	'> div': {
		width: '95%',
	},
	'> div:nth-child(1)': TagsStyle,
	'> div:nth-child(2)': ReviewStyle,
});

export default RegisterReviewClubSearchPageBodyStyle;
