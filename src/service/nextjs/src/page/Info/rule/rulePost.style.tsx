import { css } from '@emotion/css';

export const RulePostStyle = css({
	width: '100%',
	height: '340px',
	overflow: 'hidden', // 내용이 넘어갈 경우 hidden으로 스크롤 할지 아니면
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
});

export const RulePostContentStyle = css({
	width: '100%',
	height: '300px',

	'> ul': {
		'> li': {
			margin: '10px 0',
			fontSize: 16,
			fontFamily: 'Pretendard-regular',
			whiteSpace: 'pre-wrap',
			wordBreak: 'break-word',
			overflowWrap: 'break-word',
		},
	},
});

export const PostTitleStyle = css({
	width: '90%',
	padding: '0 5%',
	height: '40px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderBottom: '2px solid black',

	'> span': {
		fontSize: '22px',
		fontFamily: 'Pretendard-regular',
	},
	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px',

		'> svg': {
			cursor: 'pointer',
		},
	},
});
