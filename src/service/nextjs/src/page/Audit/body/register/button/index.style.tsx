import { css } from '@emotion/css';

export const AuditRegisterButtonStyle = css({
	width: '100%',
	height: '100%',
	backgroundColor: '#EFEEEA',

	'> button': {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		backgroundColor: '#EFEEEA',
		border: 'none',

		'&:hover': {
			cursor: 'pointer',
			backgroundColor: '#D8D8D8',
		},

		'> div': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20,
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			color: '#A7A7A7',
		},
	},
});
