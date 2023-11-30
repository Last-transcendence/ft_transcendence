import { css } from '@emotion/css';

export const ClubBtnStyle = css({
	gridColumn: 5,
	width: 46,
	height: 46,
	position: 'relative',

	'> div:nth-child(1)': {
		width: 46,
		height: 46,
		borderRadius: '70%',
		border: '1px solid black',
		backgroundColor: '#D9D9D9',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	'> div:nth-child(2)': {
		opacity: 0,
	},
});
