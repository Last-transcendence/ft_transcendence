import { css } from '@emotion/css';

const TitleStyle = css({
	display: 'flex',
	justifyContent: 'center',

	'> span': {
		fontSize: 36,
		fontFamily: 'Pretendard-medium',
	},
});

const MetaDataStyle = css({
	display: 'grid',
	gridTemplateRows: 'repeat(3, 1fr)',
	borderTop: '1px solid black',
	borderLeft: '1px solid black',
	borderRight: '1px solid black',

	'> div': {
		height: '100%',
		display: 'grid',
		gridTemplateColumns: '2fr 3fr',
		'> div': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',

			'> span': {
				fontSize: 16,
				fontFamily: 'Pretendard-regular',
			},
		},
		'> div:first-child': {
			borderRight: '1px solid black',
		},
	},
	'> div:not(:last-child)': {
		borderBottom: '1px solid black',
	},
});

const RowStyle = css({
	height: '9.52mm',
	display: 'grid',
	gridTemplateColumns: '1fr 3fr 5fr 4fr 3fr 2.98fr 2.98fr',
	borderBottom: '1px solid black',
	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'> span': {
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
		},
	},
	'> div:not(:last-child)': {
		borderRight: '1px solid black',
	},
});

const HeaderStyle = css({
	'> div': RowStyle,
	'> div:nth-child(1)': {
		backgroundColor: '#EAEAEA',
	},
	'> div:nth-child(2)': {
		height: '0.6mm',
	},
});

export const AuditExportSummaryFirstPageStyle = css({
	width: '210mm',
	height: '290mm',

	'> div:nth-child(1)': {
		width: '100%',
		height: '25mm',
		display: 'grid',
		gridTemplateColumns: '3fr 5fr 3fr',

		'> div': {
			height: '100%',
		},
		'> div:nth-child(2)': TitleStyle,
		'> div:nth-child(3)': MetaDataStyle,
	},
	'> div:nth-child(2)': {
		height: '265mm',
		borderTop: '1px solid black',
		borderLeft: '1px solid black',
		borderRight: '1px solid black',
		'> div:first-child': HeaderStyle,
		'> div:not(:first-child)': RowStyle,
	},
});

export const AuditExportSummaryAfterFirstPageStyle = css({
	width: '210mm',
	height: '293.5mm',
	borderTop: '1px solid black',
	borderLeft: '1px solid black',
	borderRight: '1px solid black',

	'> div': RowStyle,
});
