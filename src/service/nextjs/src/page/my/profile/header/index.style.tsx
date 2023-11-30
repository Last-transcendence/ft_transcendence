import { css } from '@emotion/css';

const MyPageProfileHeaderStyle = css({
	gridRow: '1',
	display: 'flex',
	justifyContent: 'space-between',
	width: '86%',
	margin: '0 auto',
	padding: '0 7%',
	alignItems: 'center',
	borderBottom: '1px solid black',

	'> div:nth-child(1)': {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		'> span': {
			fontSize: '24px',
			fontFamily: 'Pretendard-bold',
		},
	},
	'> div:nth-child(2)': {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		'&:hover': {
			cursor: 'pointer',
		},
		'> span': {
			fontSize: '18px',
			fontFamily: 'Pretendard-regular',
		},
	},
});

export default MyPageProfileHeaderStyle;
