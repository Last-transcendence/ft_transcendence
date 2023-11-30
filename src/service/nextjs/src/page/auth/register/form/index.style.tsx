import { css } from '@emotion/css';
import { PageStyle } from 'page/page.style';

export const FormRegisterPageStyle = css(PageStyle, {
	margin: '0 auto',
	width: 1000,
	height: 800,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': {
		width: 400,
		display: 'grid',
		gridTemplateRows: 'auto auto',
		rowGap: '6rem',

		'> span': {
			fontSize: 36,
			fontFamily: 'Pretendard-medium',
			margin: '0 auto',
		},
	},
});

export const RegisterFormStyle = css({
	width: '100%',

	'> div': {
		width: '100%',
		display: 'grid',
		gridTemplateRows: 'repeat(6, auto)',
		rowGap: '1rem',

		'> div': {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
		},
		'> div:nth-child(5)': {
			height: '40px',
			'> span': {
				marginLeft: '0.5rem',
				fontSize: 16,
				fontFamily: 'Pretendard-regular',
			},
		},

		'> button': {
			width: '100%',
			height: '60px',
			borderRadius: 5,
			border: '1px solid black',
			backgroundColor: 'white',
			fontSize: '20px',
			fontFamily: 'Pretendard-medium',

			':hover': {
				backgroundColor: '#BFBFBF',
			},
			'&:active': {
				backgroundColor: '#A6A6A6',
			},
		},
	},
});

export const RegisterPageCustomInputStyle = css({
	width: '100%',
	height: '40px',

	'> input': {
		width: '100%',
		height: '100%',
		fontSize: 16,
		fontFamily: 'Pretendard-regular',
		border: 'none',
		borderBottom: '1px solid black',
		backgroundColor: 'transparent',
		textIndent: '0.5rem',
		padding: 0,
		'&:focus': {
			outline: 'none',
		},
	},
});
