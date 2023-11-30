import { css } from '@emotion/css';

export const AuditRegisterStyle = css({
	width: 721,
	height: 833,
	backgroundColor: '#FFFFFF',
	borderRadius: '20px',
	display: 'grid',
	gridTemplateRows: '1fr 7fr',

	'> div': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	'> div:nth-child(1)': {
		borderBottom: '2px solid black',
		'> span': {
			fontSize: '24px',
			fontFamily: 'pretendard-medium',
		},
	},
});

// 제일 바깥 div transparent, row 1, 2 / 1번째 div에 x 두고 / 2번째 div에 실제 내용
export const AuditRegisterBodyStyle = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> form': {
		width: '60%',
		height: '80%',
	},
});
