import { css } from '@emotion/css';

const InfoPageMemberHeaderStyle = css({
	gridRow: 1,
	width: 'auto',
	height: '100px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 50px',

	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		'> span': {
			fontSize: 28,
			fontFamily: 'Pretendard-medium',
		},
	},
	'> svg': {
		cursor: 'pointer',
	},
});

export default InfoPageMemberHeaderStyle;
