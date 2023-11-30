import { css } from '@emotion/css';

export const GoogleLoginStyle = css({
	fontFamily: 'Roboto-Medium',
	backgroundColor: '#FFFFFF',
	display: 'flex',
	border: '1px solid #000000',
	borderRadius: '5px',
	cursor: 'pointer',
	boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)',

	'> svg': {
		margin: 'auto 0',
		'g[id="button"]': {
			filter: 'none',
		},
	},
});
