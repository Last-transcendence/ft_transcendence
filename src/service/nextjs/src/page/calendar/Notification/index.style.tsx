import { css } from '@emotion/css';

export const NotificationContainerStyle = css({
	border: '1px solid black',
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

export const NotificationHeaderStyle = css({
	width: '100%',
	height: '20%',
	display: 'flex',
	// justifyContent: 'center',
	alignItems: 'center',
	borderBottom: '1px solid black',
	'> svg': {
		marginLeft: '25px',
	},
	'> span': {
		marginLeft: '20px',
		fontSize: '20px',
		fontFamily: 'Pretendard-Regular',
	},
});

export const SectionStyle = css({
	width: '90%',
	height: '26%',
	borderBottom: '1.5px solid black',
	// display: 'flex',
	'> div': {
		width: '100%',
		height: '30%',
		// margin: '30px 0 0 10px',
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		'> svg': {
			marginRight: '10px',
		},
		'> span': {
			fontSize: '20px',
			fontFamily: 'Pretendard-Regular',
		},
	},
});

export const SectionLastStyle = css({
	width: '90%',
	height: '26%',
	// display: 'flex',
	'> div': {
		width: '100%',
		height: '30%',

		display: 'flex',
		gap: '10px',
		alignItems: 'center',
		'> svg': {
			marginRight: '10px',
		},
		'> span': {
			fontSize: '20px',
			fontFamily: 'Pretendard-Regular',
		},
	},
});
