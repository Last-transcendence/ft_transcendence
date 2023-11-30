import { css } from '@emotion/css';

export const ProfileSettingEditStyle = css({
	'> form': {
		display: 'grid',
		gridTemplateRows: 'repeat(4, auto)',
		rowGap: 30,
		'> div': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',

			'> span:nth-child(1)': {
				fontSize: 18,
				fontFamily: 'Pretendard-medium',
			},
			'> span:nth-child(2)': {
				fontSize: 16,
				fontFamily: 'Pretendard-regular',
			},
			'> input:nth-child(2)': {
				textAlign: 'right',
				fontSize: 16,
				fontFamily: 'Pretendard-regular',
			},
		},
		'> button': {
			padding: '5px 0px',
			fontSize: 16,
			fontFamily: 'Pretendard-medium',
		},
	},
});

export const ProfileSettingEditCompletedStyle = css({
	display: 'grid',
	gridTemplateRows: 'repeat(2, auto)',
	justifyContent: 'center',
	alignItems: 'center',
	rowGap: 40,

	'> svg': {
		margin: '0 auto',
	},

	'> p': {
		margin: 0,
		fontSize: 20,
		fontFamily: 'Pretendard-medium',
	},
});
