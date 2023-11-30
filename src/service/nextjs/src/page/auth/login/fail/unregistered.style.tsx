import { css } from '@emotion/css';
import { PageStyle } from 'page/page.style';

export const UnRegisteredPageStyle = css(PageStyle, {
	margin: '0 auto',
	width: 1200,
	height: 800,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': {
		display: 'grid',
		gridTemplateRows: 'auto auto',
		gridGap: '4rem',

		'> span': {
			fontFamily: 'Pretendard-regular',
			margin: 'auto',
			':nth-child(1)': {
				fontSize: 24,
			},
			':nth-child(2)': {
				fontSize: 20,
				cursor: 'pointer',
				textDecoration: 'underline',
				textUnderlinePosition: 'under',
			},
		},
	},
});
