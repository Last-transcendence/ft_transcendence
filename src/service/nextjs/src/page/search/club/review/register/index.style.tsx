import { css } from '@emotion/css';
import { PageStyle } from 'page/page.style';

const HeaderStyle = css({
	height: 96,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 30px',
	gap: 30,
	borderBottom: '1px solid black',

	'> div': {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		'> span': {
			fontSize: 23,
			fontFamily: 'Pretendard-medium',
		},
	},
	'> div:nth-child(2)': {
		cursor: 'pointer',
	},
});

const RegisterReviewClubSearchPageStyle = css(PageStyle, {
	border: '1px solid black',

	'> div:nth-child(1)': HeaderStyle,
});

export default RegisterReviewClubSearchPageStyle;
