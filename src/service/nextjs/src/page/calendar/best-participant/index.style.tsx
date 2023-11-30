import { css } from '@emotion/css';

export const BestParticipantStyle = css({
	border: '1px solid black',
	display: 'grid',
	gridTemplateRows: '78px 252px',
});

export const BestParticipantHeaderStyle = css({
	borderBottom: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	paddingLeft: 20,

	'> span': {
		fontFamily: 'Pretendard-medium',
		fontSize: '20px',
	},
});

export const BestParticipantBodyStyle = css({
	display: 'grid',
	width: '100%',
	margin: 'auto',
	gridTemplateRows: 'auto auto auto',
	gap: '15px',
	alignItems: 'center',
	justifyItems: 'center',

	'> span': {
		fontFamily: 'Pretendard-regular',
		fontSize: '20px',
	},
	'> div:nth-child(3)': {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		marginRight: '7px',
		'> span': {
			fontFamily: 'Pretendard-regular',
			fontSize: '18px',
		},
	},
});
