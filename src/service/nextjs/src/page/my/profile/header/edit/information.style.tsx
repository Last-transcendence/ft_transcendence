import { css } from '@emotion/css';

export const EditProfileInformationStyle = css({
	width: '90%',
	margin: '0 auto',

	'> div:nth-child(1)': {
		marginBottom: '2rem',
		fontFamily: 'Pretendard-medium',
		fontSize: 20,
	},

	'> div:nth-child(n+2)': {
		width: '90%',
		margin: '0 auto',
		marginBottom: '1rem',
		display: 'grid',
		gridTemplateColumns: '20px 70px 1fr',
		columnGap: '1.5rem',
		alignItems: 'center',

		'> :nth-child(1)': {},
		'> :nth-child(2)': {
			fontFamily: 'Pretendard-regular',
		},
		'> input:nth-child(3)': {
			border: 'none',
			borderBottom: '1px solid black',
			backgroundColor: 'transparent',
			'&:focus': {
				outline: 'none',
			},
		},
		'> :nth-child(3)': {
			fontFamily: 'Pretendard-regular',
		},
	},
});
