import { css } from '@emotion/css';

export const AuditRegisterUploadFormStyle = css({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '2rem',

	'> *': {
		width: '100%',
	},

	'> div:nth-child(1)': {
		height: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

		'> div:nth-child(1)': {
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',

			'> span:nth-child(1)': {
				justifySelf: 'center',
				alignSelf: 'center',
				gridColumn: '2',
				fontSize: 24,
				fontFamily: 'pretendard-medium',
			},
			'> span:nth-child(2)': {
				marginTop: 'auto',
				justifySelf: 'right',
				gridColumn: '3',
				fontSize: 18,
				fontFamily: 'pretendard-regular',
			},
		},

		'> div:nth-child(2)': {
			width: '100%',
			height: '100%',
			backgroundColor: 'transparent',
			border: '2px solid black',
			justifyContent: 'center',
			alignItems: 'center',
			margin: 'auto',
			marginTop: '20px',
			display: 'flex',
			position: 'relative',

			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				transition: '0.2s',
			},

			'> img:nth-child(1)': {
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				position: 'absolute',
			},
			'> div:nth-child(1)': {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '2rem',
				position: 'absolute',

				'> svg:nth-child(1)': {
					marginTop: '1rem',
				},
				'> span:nth-child(2)': {
					fontSize: 20,
					fontFamily: 'pretendard-regular',
				},
			},
			'> input:nth-child(2)': {
				width: '100%',
				height: '100%',
				cursor: 'pointer',
				position: 'absolute',
				opacity: 0,
			},
		},
	},

	'> button:nth-child(2)': {
		width: '100%',
		height: '8%',
		border: '2px solid black',
		borderRadius: '5px',
		backgroundColor: 'transparent',
		cursor: 'pointer',

		'> span': {
			fontSize: 20,
			fontFamily: 'pretendard-regular',
		},

		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.1)',
			transition: '0.2s',
		},
	},
});
