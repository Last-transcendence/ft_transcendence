import { css } from '@emotion/css';

const HeaderStyle = css({
	height: '50px',
	display: 'flex',
	margin: '17px auto 33px auto',
	justifyContent: 'space-between',

	'> span': {
		marginTop: 'auto',
	},
	'> span:nth-child(1)': {
		fontSize: '25px',
		fontFamily: 'Pretendard-medium',
	},
	'> span:nth-child(2)': {
		fontSize: '20px',
		fontFamily: 'Pretendard-regular',
	},
});

const BodyStyle = css({
	display: 'grid',
	margin: '0 auto',
	gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
	gap: 20,
	overflowY: 'auto',
});

const CommonStyle = css({
	margin: '0 50px',
	display: 'grid',
	gridTemplateRows: '100px auto',

	'> div': {
		width: '95%',
	},
	'> div:nth-child(1)': HeaderStyle,
	'> div:nth-child(2)': BodyStyle,
});

const InfoPageMemberBodyStyle = css({
	gridRow: 2,
	display: 'grid',
	gridTemplateRows: 'auto auto',
	marginBottom: '2rem',

	'> div': CommonStyle,
	'> div:nth-child(1)': {
		// manager
		paddingBottom: '30px',
		borderBottom: '1px solid black',
	},
	'> div:nth-child(2)': {
		// member
	},
});

export default InfoPageMemberBodyStyle;
