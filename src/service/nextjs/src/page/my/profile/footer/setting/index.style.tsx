import { css } from '@emotion/css';

const ProfileSettingHeaderStyle = css({
	borderBottom: '1px solid black',
	display: 'flex',
	gap: 15,
	paddingLeft: 33,
	alignItems: 'center',

	'> span': {
		fontSize: 24,
		fontFamily: 'Pretendard-semibold',
	},
});

const ProfileSettingBodyStyle = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': {
		width: '75%',
	},
});

const ProfileSettingStyle = css({
	width: 477,
	height: 350,
	backgroundColor: '#EFEEEA',
	display: 'grid',
	gridTemplateRows: '85px 1fr',
	border: '1px solid black',
	borderRadius: 20,

	'> div:nth-child(1)': ProfileSettingHeaderStyle,
	'> div:nth-child(2)': ProfileSettingBodyStyle,
});

export default ProfileSettingStyle;
