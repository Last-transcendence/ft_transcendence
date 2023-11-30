import { css } from '@emotion/css';

export const AuditDocumentBodyStyle = css({
	display: 'grid',
	gridTemplateRows: '1fr 1fr 1fr 5fr 5fr 5fr',
	border: '2px solid black',

	'> div: nth-child(2)': {
		display: 'grid',
		gridTemplateColumns: '3fr 2fr',
		borderBottom: '2px solid black',
	},
	'> div: nth-child(3)': {
		display: 'grid',
		gridTemplateColumns: '3fr 2fr',
		borderBottom: '2px solid black',
	},
	'> div: nth-child(5)': {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		borderBottom: '2px solid black',
	},
});
