import { css } from '@emotion/css';

export const ToolBarStyle = css({
	position: 'sticky',
	top: 0,
	left: 0,
	width: '100%',
	height: '70px',
	backgroundColor: 'transparent',
	transition: 'background-color 0.3s ease-in-out',
	zIndex: 999,

	'&.scrolled': {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},

	'> div': {
		width: '1168px',
		height: '100%',
		margin: '0 auto',
		padding: '0 1rem',
		border: '1px solid black',
		borderRadius: '200px',
		backgroundColor: '#EFEEEA',
		display: 'grid',
		gridTemplateColumns: 'auto 2fr auto 1fr auto',
		alignItems: 'center',
	},
});
