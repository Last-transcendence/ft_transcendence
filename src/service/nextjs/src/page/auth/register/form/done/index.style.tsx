import { css } from '@emotion/css';

const DivStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',

	'> span': {
		fontSize: 32,
		fontFamily: 'Pretendard-medium',
	},
});

const SvgStyle = css({
	margin: '0 auto',
});

const ButtonStyle = css({
	width: '100%',
	height: '3rem',
	fontSize: 16,
	fontFamily: 'Pretendard-medium',
	backgroundColor: 'transparent',
	border: '1px solid black',
	borderRadius: 5,
});

const DoneFormRegisterStyle = css({
	display: 'grid',
	gridTemplateRows: 'repeat(3, auto)',
	gap: '1rem',

	'> div': DivStyle,
	'> svg': SvgStyle,
	'> button': ButtonStyle,
});

export default DoneFormRegisterStyle;
