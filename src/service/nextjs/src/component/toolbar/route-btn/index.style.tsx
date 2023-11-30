import { css } from '@emotion/css';

export const ToolBarRouteBtnsStyle = css({
	display: 'grid',
	gridTemplateColumns: 'repeat(5, auto)',

	'> div': {
		borderLeft: '1px solid black',
	},
	'> div:last-child': {
		borderRight: '1px solid black',
	},
});

export const ToolBarRouteBtnStyle = css({
	'> a': {
		margin: '0 1rem',
		' > button': {
			padding: '8px 12px',
			height: '100%',
			fontFamily: 'Pretendard-regular',
			fontSize: 20,
			cursor: 'pointer',
			border: 'none',
			borderRadius: 20,
			transition: `background-color 0.3s, color 0.3s;`,

			':hover': {
				backgroundColor: 'gray',
				color: 'white',
			},
			':active': {
				backgroundColor: 'darkgray',
				color: 'white',
			},
		},
	},
});
