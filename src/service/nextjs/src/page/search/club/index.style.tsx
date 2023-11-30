import { css } from '@emotion/css';
import { PageStyle } from 'page/page.style';

const HeaderStyle = css({
	height: 96,
	display: 'flex',
	alignItems: 'center',
	padding: '0 30px',
	gap: 30,
	borderBottom: '1px solid black',

	'> svg': {
		cursor: 'pointer',
	},
	'> span': {
		fontSize: 23,
		fontFamily: 'Pretendard-medium',
	},
});

const ClubSearchPageStyle = css(PageStyle, {
	border: '1px solid black',

	'> div:nth-child(1)': HeaderStyle,
});

export default ClubSearchPageStyle;
