import { css } from '@emotion/css';

const MemberProfileImageStyle = css({
	backgroundColor: '#D9D9D9',
	borderBottom: '1px solid black',
	overflow: 'hidden',

	'> img': {
		width: '100%',
		height: '100%',
	},
});

const MemberProfileDescriptionStyle = css({
	display: 'flex',
	alignItems: 'center',
	padding: '0 20px',
	gap: 6,

	'> span': {
		fontSize: 16,
		fontFamily: 'Pretendard-regular',
	},
});

const MemberProfileStyle = css({
	height: '249px',
	display: 'grid',
	gridTemplateRows: '3fr 1fr',
	border: '1px solid black',
	overflow: 'hidden',
	cursor: 'pointer',

	'&:hover': {
		outline: '5px auto -webkit-focus-ring-color',
	},
	'&:active': {
		outline: 'none',
	},

	'> div:nth-child(1)': MemberProfileImageStyle,
	'> div:nth-child(2)': MemberProfileDescriptionStyle,
});

export default MemberProfileStyle;
