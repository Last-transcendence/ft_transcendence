import { css } from '@emotion/css';

export const AuditRegisterPreviewStyle = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	'> div': {
		width: '85%',
		height: '85%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',

		'> div:nth-child(1)': {
			width: '100%',
			height: '85%',
			display: 'grid',
			gridTemplateRows: '1fr 1fr 1fr 1fr 4fr 2fr',
			border: '1.5px solid black',
			borderRadius: '5px',

			span: {
				fontSize: '16px',
				fontFamily: 'pretendard-medium',
			},

			'> div:nth-child(-n + 4)': {
				display: 'grid',
				gridTemplateColumns: '1fr 4fr',
				borderBottom: '1.5px solid black',

				div: {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'> div:nth-child(1)': {
					borderRight: '1.5px solid black',
				},
				'> div:nth-child(2)': {
					input: {
						width: '90%',
						height: '90%',
						border: 'none',
						outline: 'none',
						fontSize: '16px',
						fontFamily: 'pretendard-regular',
					},
				},
			},
			'> div:nth-child(5)': {
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',

				'> div': {
					display: 'grid',
					gridTemplateRows: '1fr 5fr',

					'> div': {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderBottom: '1.5px solid black',
					},
					'> div:nth-child(2)': {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
						'> img': {
							width: '90%',
							height: 155,
							objectFit: 'cover',
							objectPosition: 'center',
							border: '1.5px solid black',
						},
					},
				},
				'> div:nth-child(-n + 2)': {
					borderRight: '1.5px solid black',
				},
			},
			'> div:nth-child(6)': {
				display: 'grid',
				gridTemplateColumns: '1fr 4fr',

				'> div:nth-child(1)': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRight: '1.5px solid black',
				},
				'> div:nth-child(2)': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					textarea: {
						width: '90%',
						height: '70%',
						border: 'none',
						outline: 'none',
						fontSize: '16px',
						fontFamily: 'pretendard-regular',
						resize: 'none',
						overflowY: 'auto',
					},
				},
			},
		},

		'> div:nth-child(2)': {
			width: '85%',
			height: '8%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',

			'> button': {
				height: '100%',
				borderRadius: '5px',
				cursor: 'pointer',
			},
			'> button:nth-child(1)': {
				width: '60%',
				backgroundColor: 'white',
				'&:hover': {
					backgroundColor: '#F0F0F0',
				},
				'&:active': {
					backgroundColor: '#E0E0E0',
				},
				'> span': {
					fontSize: '20px',
					fontFamily: 'pretendard-medium',
				},
			},
			'> button:nth-child(2)': {
				width: '30%',
				backgroundColor: 'rgba(184, 203, 214, 0.3)',
				'&:hover': {
					backgroundColor: 'rgba(184, 203, 214, 0.5)',
				},
				'&:active': {
					backgroundColor: 'rgba(184, 203, 214, 0.7)',
				},
				'> span': {
					fontSize: '16px',
					fontFamily: 'pretendard-regular',
				},
			},
		},
	},
});
