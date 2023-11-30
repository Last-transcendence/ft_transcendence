import { css } from '@emotion/css';

export const AuditDocumentBodyTitleStyle = css({
	display: 'grid',
	gridTemplateColumns: '1fr 10fr',
	borderBottom: '2px solid black',

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
		padding: '0 3%',
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
