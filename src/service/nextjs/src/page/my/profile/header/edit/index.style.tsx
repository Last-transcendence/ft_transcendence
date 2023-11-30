import { css } from '@emotion/css';

export const EditProfileStyle = css({
	width: 430,
	height: 700,
	borderRadius: '10px',
	backgroundColor: '#EFEEEA',

	'> div': {
		padding: '5% 0',
		display: 'grid',
		gridTemplateRows: 'auto 1fr auto',
		rowGap: '5%',
		'> div:nth-child(2)': {
			height: 538,
			overflowY: 'auto',
		},
	},
});
