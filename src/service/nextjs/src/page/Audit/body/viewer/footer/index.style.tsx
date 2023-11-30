import { css } from '@emotion/css';

const AuditDocumentViewerFooterStyle = css({
	backgroundColor: 'transparent',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	gap: 25,

	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		'> span': {
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			color: 'white',
		},
		'> svg > path': {
			fill: 'white',
		},
	},
	'> div:nth-child(1)': {
		gap: 5,
	},
	'> div:nth-child(2)': {
		gap: 2,
	},
});

export default AuditDocumentViewerFooterStyle;
