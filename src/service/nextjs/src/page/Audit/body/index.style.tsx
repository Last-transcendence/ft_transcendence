import { css } from '@emotion/css';

const HeaderTitleStyle = css({
	fontSize: 24,
	fontFamily: 'Pretendard-medium',
});

const HeaderExportStyle = css({
	display: 'flex',
	alignItems: 'center',
	gap: 30,
	'> span': {
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
	},
	'> div': {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		'&:hover': {
			cursor: 'pointer',
		},
		'> span': {
			fontSize: 20,
			fontFamily: 'Pretendard-regular',
		},
	},
});

const HeaderStyle = css({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 40px',
	borderBottom: '1px solid #000000',

	'> span:nth-child(1)': HeaderTitleStyle,
	'> div:nth-child(2)': HeaderExportStyle,
	'> div:nth-child(3)': {
		position: 'absolute',
		left: '100vw',
	},
});

const BodySortStyle = css({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	padding: '0 5px',
	gap: 21,
	'> span': {
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
		textDecoration: 'underline',
		textUnderlinePosition: 'under',
	},
	'> svg': {
		'&:hover': {
			cursor: 'pointer',
		},
		marginTop: 3,
	},
});

const BodyDocumentsStyle = css({
	overflowY: 'auto',

	'> div': {
		width: '99%',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
		gap: 12,

		'> div': {
			width: '100%',
			height: 280,
			border: '1px solid black',
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
});

const BodyStyle = css({
	margin: '36px',
	display: 'grid',
	gridTemplateRows: '24px 878px',
	gap: 20,

	'> div:nth-child(1)': BodySortStyle,
	'> div:nth-child(2)': BodyDocumentsStyle,
});

const AuditPageBodyStyle = css({
	border: '1px solid black',
	height: 1100,
	display: 'grid',
	gridTemplateRows: '105px auto',

	'> div:nth-child(1)': HeaderStyle,
	'> div:nth-child(2)': BodyStyle,
});

export default AuditPageBodyStyle;
