import { css } from '@emotion/css';

export const ProfileSettingBeforeAuthorizedStyle = css({
	display: 'grid',
	gridTemplateRows: 'repeat(3, auto)',
	rowGap: 36,

	'> span:nth-child(1)': {
		fontSize: 24,
		fontFamily: 'Pretendard-semibold',
	},
	'> span:nth-child(2)': {
		fontSize: 20,
		fontFamily: 'Pretendard-regular',
	},
	'> form': {
		'> *': {
			fontSize: 20,
			fontFamily: 'Pretendard-regular',
		},
		'> input': {
			padding: '3px 6px',
			borderRadius: 5,
			marginRight: 5,
		},
		'> button': {
			padding: '3px 6px',
			borderRadius: 5,
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
});
