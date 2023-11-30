import { css } from '@emotion/css';

const WrapperStyle = css({
	width: '94%',
	marginBottom: '2rem',
	'> div': {
		padding: '0 2%',
	},
});

const SearchPageBodyStyle = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': WrapperStyle,
});

export default SearchPageBodyStyle;
