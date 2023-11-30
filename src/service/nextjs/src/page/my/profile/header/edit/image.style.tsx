import { css } from '@emotion/css';

export const EditProfileImageStyle = css({
	margin: '0 auto',
	width: '90%',
	marginBottom: '2rem',

	'> div:nth-child(1)': {
		display: 'flex',
		justifyContent: 'space-between',

		fontSize: 20,
		'> :nth-child(1)': {
			fontFamily: 'Pretendard-medium',
		},
		'> :nth-child(2)': {
			display: 'none',
		},
		'> :nth-child(3)': {
			fontFamily: 'Pretendard-light',
			color: '#0000FF',
			':hover': {
				cursor: 'pointer',
			},
		},
	},

	'> div:nth-child(2)': {
		marginTop: '1rem',
		display: 'flex',

		'> div': {
			margin: 'auto',
		},
		'> svg': {
			margin: 'auto',
			width: 196,
			height: 196,
		},
	},
});
