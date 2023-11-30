import { css } from '@emotion/css';

export const AuditDocumentBodyRemarkStyle = css({
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
		'> textarea': {
			fontSize: 10,
			fontFamily: 'Pretendard-regular',
			width: '100%',
			height: '85%',
			border: 'none',
			resize: 'none',
			':focus': {
				outline: 'none',
			},
		},
		'> span': {
			fontSize: 10,
			fontFamily: 'Pretendard-regular',
			whiteSpace: 'pre-wrap',
			wordBreak: 'break-word',
			overflowWrap: 'break-word',
		},
	},
});
