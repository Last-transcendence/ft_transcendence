import { css } from '@emotion/css';

export const AuditDocumentBodyBalanceStyle = css({
	display: 'grid',
	gridTemplateColumns: '1fr 3.4fr',

	'> div': {
		display: 'flex',
		alignItems: 'center',
	},
	'> div:nth-child(1)': {
		borderRight: '2px solid black',
		justifyContent: 'center',
		backgroundColor: '#F2F2F2',
		'> span': {
			fontSize: 10,
			fontFamily: 'Pretendard-regular',
		},
	},
	'> div:nth-child(2)': {
		padding: '0 8%',
		'> input': {
			width: '100%',
			fontSize: 10,
			fontFamily: 'Pretendard-regular',
		},
		'> span': {
			fontSize: 10,
			fontFamily: 'Pretendard-regular',
		},
	},
});
