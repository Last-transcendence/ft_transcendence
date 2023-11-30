import { css } from '@emotion/css';

export const RegisterFormPagePasswordInputStyle = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '0.5rem',

	'> div:nth-child(2)': {
		width: '100%',
		position: 'relative',

		'> span': {
			fontFamily: 'Pretendard-regular',
		},
		'> span:nth-child(1)': {
			float: 'left',
			color: '#6F6F6F',
			fontSize: 14,
			cursor: 'pointer',
		},
		'> span:nth-child(2)': {
			display: 'none',
			float: 'right',
			color: 'red',
			fontSize: 16,
		},
	},
});
