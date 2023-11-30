import { css } from '@emotion/css';

export const RegisterFormPageIdInputStyle = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '0.5rem',

	'> div': {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '3fr 1fr',
		gap: '1rem',
		justifyContent: 'center',
		alignItems: 'center',

		'> div:nth-child(2)': {
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: '1px solid black',
			borderRadius: 3,
			backgroundColor: 'white',
			cursor: 'pointer',

			'> span': {
				fontSize: 16,
				fontFamily: 'Pretendard-regular',
			},
		},
	},
	'> span': {
		display: 'none',
		alignSelf: 'flex-end',
		color: 'red',
		fontSize: 16,
		fontFamily: 'Pretendard-regular',
	},
});
