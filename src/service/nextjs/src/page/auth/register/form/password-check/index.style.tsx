import { css } from '@emotion/css';

export const RegisterFormPagePasswordCheckInputStyle = css({
	display: 'flex',
	alignItems: 'center',
	borderBottom: '1px solid black',

	'> div': {
		'> input': {
			border: 'none',
		},
	},
	'> svg': {
		justifySelf: 'flex-end',
		display: 'none',
	},
});
