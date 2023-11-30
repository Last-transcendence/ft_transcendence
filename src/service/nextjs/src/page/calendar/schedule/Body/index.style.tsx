import { css } from '@emotion/css';

export const ScheduleBodyContainer = css({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '20px',
});

// adjust width
export const ScheduleFooterContainer = css({
	borderTop: '1px solid black',
	padding: '66px',
	// 좌우로 38px margin
	margin: '0px 38px',
	'> span': {
		fontSize: '20px',
		// fontfamily : Inter
		fontFamily: 'pretendard-regular',
	},
	'> div': {
		width: '100%',
		'> textarea': {
			width: '100%',
			height: '100%',
			border: 'none',
			resize: 'none',
			fontSize: '1.2rem',
			backgroundColor: 'transparent',
			marginTop: '20px',
			'&:focus': {
				outline: 'none',
			},
		},
	},
});
