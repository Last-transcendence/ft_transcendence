import { css } from '@emotion/css';

export const AuditFormHeaderStyle = css({
	display: 'grid',
	gridTemplateColumns: '1fr 2fr 1fr',

	'> span:nth-child(1)': {
		margin: 'auto auto 7px 3px',
		fontSize: 12,
		fontFamily: 'Pretendard-regular',
	},
	'> span:nth-child(2)': {
		margin: '0 auto auto auto',
		fontSize: 20,
		fontFamily: 'Pretendard-medium',
	},
});

export const AuditFormHeaderMetaStyle = css({
	display: 'grid',
	gridTemplateRows: '1fr 1fr 1fr',
	borderLeft: '2px solid black',
	borderRight: '2px solid black',

	input: {
		textAlign: 'center',
		fontSize: 8,
		fontFamily: 'Pretendard-regular',
	},
	'> div': {
		display: 'grid',
		gridTemplateColumns: '1fr 2fr',
		fontSize: 8,
		fontFamily: 'Pretendard-regular',
		borderTop: '2px solid black',

		'> div': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		'> div:nth-child(1)': {
			borderRight: '2px solid black',
		},
		'> div:nth-child(2)': {
			input: {
				width: '100%',
			},
		},
	},
	'> div:last-child': {
		'> div:nth-child(2)': {
			margin: '0 5%',
			display: 'grid',
			gridTemplateColumns: '1.6fr 1fr 1fr',
			gap: '5%',
			'> div': {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			},
		},
	},
});
