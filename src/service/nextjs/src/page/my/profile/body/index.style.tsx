import { css } from '@emotion/css';

const ProfileStyle = css({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gap: '2rem',

	'> div:nth-child(2)': {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		padding: '0.5rem 0',
		gap: '1rem',

		'> span:nth-child(1)': {
			fontSize: '24px',
			fontFamily: 'Pretendard-medium',
		},
		'> span:nth-child(2)': {
			fontSize: '16px',
			fontFamily: 'Pretendard-regular',
			//whiteSpace: 'pre-wrap',
			//wordBreak: 'break-all',
			//overflowWrap: 'break-word',
		},
	},
});

const InformationKeyStyle = css({
	width: 128,
	gridColumn: '1',
	display: 'grid',
	gridTemplateColumns: '20px 1fr',
	gap: '21px',
	alignItems: 'center',

	'> svg': {
		margin: '0 auto',
	},
	'> span': {
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
	},
});

const InformationValueStyle = css({
	gridColumn: '2',
	fontSize: 16,
	fontFamily: 'Pretendard-light',
});

const InformationStyle = css({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gap: '2rem',
	alignItems: 'center',
	height: 30,
	lineHeight: '30px',

	'> :nth-child(1)': InformationKeyStyle,
	'> :nth-child(2)': InformationValueStyle,
});

const MyPageProfileBodyStyle = css({
	width: '80%',
	margin: '3rem auto 0 auto',
	gridRow: '1',
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	rowGap: '4rem',

	'> div:nth-child(1)': ProfileStyle,
	'> div:nth-child(2)': {
		display: 'grid',
		gridTemplateRows: 'repeat(7, 1fr)',

		'> div': InformationStyle,
	},
});

export default MyPageProfileBodyStyle;
