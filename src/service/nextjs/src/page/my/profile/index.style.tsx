import { css } from '@emotion/css';

const MyPageProfileStyle = css({
	gridColumn: '1',
	display: 'grid',
	gridTemplateRows: '85px 1fr',
	border: '1px solid black',

	'> div:nth-child(2)': {
		display: 'grid',
		gridTemplateRows: '1fr 60px',
	},
});

export default MyPageProfileStyle;
