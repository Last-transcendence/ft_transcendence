import { css } from '@emotion/css';

const SearchPageBodyTagStyle = css({
	height: 180,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderBottom: '1px solid black',

	'> div': {
		width: 100,
		height: 100,
		border: '1px solid black',
		'> input': {
			display: 'none',
		},
		'> label': {
			display: 'block',
			lineHeight: '100px',
			textAlign: 'center',
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			cursor: 'pointer',
		},
	},
});

export default SearchPageBodyTagStyle;
