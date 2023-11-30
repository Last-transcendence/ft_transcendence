import { css } from '@emotion/css';

export const ProfileSettingAfterAuthorizedStyle = css({
	display: 'grid',
	gridTemplateRows: 'repeat(2, auto)',
	rowGap: '3rem',

	'> div': {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'> :nth-child(1)': {
			fontSize: 24,
			fontFamily: 'Pretendard-medium',
		},
		'> span:nth-child(2)': {
			fontSize: 20,
			fontFamily: 'Pretendard-regular',
		},
		'> button:nth-child(2)': {
			fontSize: 18,
			fontFamily: 'Pretendard-regular',
			padding: '5px 10px',
			borderRadius: 5,
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
});
