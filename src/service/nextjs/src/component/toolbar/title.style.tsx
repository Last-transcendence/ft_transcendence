import { css } from '@emotion/css';

export const ToolBarTitleStyle = css({
	gridColumn: 1,
	height: 70,
	display: 'flex',
	alignItems: 'center',
	gap: '0.7rem',

	'> a': {
		marginLeft: '0.5rem',
		marginRight: '0.25rem',
	},

	'> span:nth-child(2)': {
		fontFamily: 'Pretendard-medium',
		fontSize: '20px',
		fontWeight: '500',
		lineHeight: '70px',
		textTransform: 'uppercase',
	},

	'> span:nth-child(3)': {
		fontFamily: 'Pretendard-medium',
		fontSize: '20px',
		fontWeight: '500',
		lineHeight: '70px',
		textTransform: 'uppercase',
	},
});
