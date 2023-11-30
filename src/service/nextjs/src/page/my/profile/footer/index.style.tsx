import { css } from '@emotion/css';

const MyPageProfileFooterStyle = css({
	gridRow: '2',
	width: '86%',
	margin: '0 7%',
	display: 'flex',
	justifyContent: 'flex-end',

	'> svg': {
		marginBottom: 'auto',
		'&:hover': {
			cursor: 'pointer',
		},
	},
});

export default MyPageProfileFooterStyle;
