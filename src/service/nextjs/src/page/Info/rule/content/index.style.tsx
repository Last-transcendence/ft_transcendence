import { css } from '@emotion/css';

export const RuleContentStyle = css({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
	padding: '20px',
	gap: '20px',

	'> div': {
		width: '100%',
	},
});

export const RuleContentContainer = css({
	width: '90%',
	height: '80%',
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',

	'> div:nth-child(1)': {
		width: '100%',
		height: '40px',
		display: 'flex',
		justifyContent: 'flex-end',
		borderBottom: '1px solid #000',
	},
	'> div:nth-child(2)': {
		height: '569px',
		overflowY: 'auto',
	},
});

export const RuleContentButtonStyle = css({
	border: 'none',
	background: 'none',
	transition: 'background-color 0.3s',
	fontSize: 18,
	fontFamily: 'Pretendard-regular',

	cursor: 'pointer', // 마우스 커서 모양 설정 (옵션)
	'&:hover': {
		// backgroundColor: '#ff0000',
		color: '#fff',
	},
});

export const RuleModalStyle = css({
	display: 'grid',
	gridTemplateRows: '1fr',
	gridTemplateColumns: '1fr',
});

export const InputTitleStyle = css({
	height: '40px',
	padding: '0 20px',
});

export const InputContentStyle = css({
	height: '200px',
	padding: '20px',
	resize: 'none',
	overflowY: 'auto',
});

export const ModalContentStyle = css({
	backgroundColor: '#EFEEEA',
	width: '700px',
	height: '550px',
	borderRadius: '10px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '2rem',

	'> div': {
		width: '80%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		'input, textarea': {
			width: '100%',
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			backgroundColor: 'transparent',
			'&:focus': {
				outline: 'none',
			},
		},
		'> input': {
			border: 'none',
			borderBottom: '2px solid black',
		},
		'> textarea': {
			border: '2px solid black',
		},
	},

	'> div:nth-child(3)': {
		button: {
			width: '100%',
			height: '40px',
			borderRadius: '5px',
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			backgroundColor: 'white',
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: '#E5E5E5',
			},
			'&:active': {
				backgroundColor: '#D9D9D9',
			},
		},
	},
});
