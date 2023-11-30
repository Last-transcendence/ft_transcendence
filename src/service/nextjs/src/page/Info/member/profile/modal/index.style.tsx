import { css } from '@emotion/css';

const FirstRowImageStyle = css({
	width: '44%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: 10,
	border: '1px solid black',
});

const FirstRowDescriptionItemStyle = css({
	marginTop: 10,
	'> div': {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		'> span:nth-child(1)': {
			fontSize: 18,
			fontFamily: 'Pretendard-regular',
		},
		'> span:nth-child(2)': {
			fontSize: 22,
			fontFamily: 'Pretendard-regular',
		},
		'> span:nth-child(3)': {
			fontSize: 22,
			fontFamily: 'Pretendard-medium',
		},
	},
});

const FirstRowDescriptionIconStyle = css({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		borderBottom: '2px solid black',
		'> svg': {
			marginBottom: 5,
			cursor: 'pointer',
		},
	},
});

const FirstRowDescriptionStyle = css({
	width: '48%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	'> div:nth-child(1)': FirstRowDescriptionItemStyle,
	'> div:nth-child(2)': FirstRowDescriptionIconStyle,
});

const FirstRowStyle = css({
	height: 250,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',

	'> img': FirstRowImageStyle,
	'> div': FirstRowDescriptionStyle,
});

const SecondRowHeaderStyle = css({
	padding: '10px',
	borderBottom: '2px solid black',
	'> span': {
		fontSize: 24,
		fontFamily: 'Pretendard-medium',
	},
});

const SecondRowContentStyle = css({
	padding: '0 10px',
	paddingTop: '20px',
	'> span': {
		fontSize: 22,
		fontFamily: 'Pretendard-regular',
	},
});

const SecondRowStyle = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	'> div:nth-child(1)': SecondRowHeaderStyle,
	'> div:nth-child(2)': SecondRowContentStyle,
});

const ThirdRowHeaderStyle = css({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '10px',
	borderBottom: '2px solid black',
	'> span:nth-child(1)': {
		fontSize: 24,
		fontFamily: 'Pretendard-medium',
	},
	'> span:nth-child(2)': {
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
	},
});

const ThirdRowContentStyle = css({
	padding: '0 10px',
	paddingTop: '20px',
	'> span': {
		fontSize: 22,
		fontFamily: 'Pretendard-regular',
	},
	'> div': {
		height: 40,
		borderRadius: 20,
		border: '2px solid black',
		display: 'flex',
		alignItems: 'center',
		'> div': {
			height: '100%',
			borderRadius: 18,
			backgroundColor: 'black',
		},
		'> span': {
			position: 'absolute',
			right: '13%',
			fontSize: 20,
			fontFamily: 'Pretendard-medium',
		},
	},
});

const ThirdRowStyle = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	'> div:nth-child(1)': ThirdRowHeaderStyle,
	'> div:nth-child(2)': ThirdRowContentStyle,
});

const InnerWrapperStyle = css({
	width: '85%',
	height: '80%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',

	'> div': {
		width: '100%',
	},

	'> div:nth-child(1)': FirstRowStyle,
	'> div:nth-child(2)': SecondRowStyle,
	'> div:nth-child(3)': ThirdRowStyle,
});

const MemberProfileModalStyle = css({
	width: 600,
	height: 700,
	backgroundColor: '#EFEEEA',
	borderRadius: 10,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': InnerWrapperStyle,
});

export default MemberProfileModalStyle;
