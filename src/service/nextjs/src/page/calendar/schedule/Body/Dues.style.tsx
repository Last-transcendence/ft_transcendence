import { css } from '@emotion/css';

export const DuesContainerStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

export const InputFeeAmountContainer = css({
	width: '352px',
	height: '333px',
	borderTop: '1px solid black',
	fontFamily: 'Pretendard-regular',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

export const ShowFeeAmountContainer = css({
	//margin 위로 28 양옆으로 42 아래로는 0

	margin: '28px 42px 10px 42px',
	'> div': {
		width: '268px',
		backgroundColor: 'black',
		color: 'white',
		borderRadius: '5px',
		'> input': {
			border: 'none',
			outline: 'none',
			fontSize: '16px',
			backgroundColor: 'black',
			color: 'white',
			width: '100%',
			margin: '10px 0px 10px 15px',
		},
	},
});

export const ButtonContainer = css({
	width: '268px',
});

export const ButtonRowStyle = css({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	marginBottom: '10px',
});

export const ButtonStyle = css({
	flexGrow: 1,
	padding: '10px',
	fontSize: '16px',
	border: '1px solid black',
	borderRadius: '10px',
	backgroundColor: '#f0f0f0',
	cursor: 'pointer',
	marginTop: '5px',
	':hover': {
		backgroundColor: '#e0e0e0',
	},
});
