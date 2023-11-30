import { css } from '@emotion/css';

export const TitleContainerStyle = css({
	width: '75%',
	alignItems: 'center',
	paddingTop: '40px',
	paddingBottom: '70px',

	'> div: nth-child(1)': {
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		gap: '15px',
		fontFamily: 'Pretendard-bold',
		marginBottom: '45px',
	},
	'> div: nth-child(2)': {
		padding: '15px',
		fontFamily: 'Pretendard-bold',
		fontSize: '20px',
	},
});
