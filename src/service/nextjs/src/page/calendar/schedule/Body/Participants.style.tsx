import { css } from '@emotion/css';

export const ParticipantsContainerStyle = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	borderRight: '1px solid black',
});

export const SelectContainerStyle = css({
	width: '352px',
	height: '333px',
	borderTop: '1px solid black',
	fontFamily: 'Pretendard-regular',

	'> div': {
		display: 'grid',
		alignItems: 'center',
		gap: '10px',
		gridTemplateColumns: '0.8fr 2fr',
		justifyContent: 'center',
		padding: '30px 10px 0px 10px',
		'> div: nth-child(1)': {
			display: 'flex',
			justifyContent: 'left',
			fontSize: '16px',
			marginBottom: '10px',
			paddingLeft: '20%',
		},
	},
});

export const SelectButtonStyle = css({
	width: '62px',
	height: '62px',
	border: '1px solid black',
	borderRadius: '100%',
	cursor: 'pointer',
	':hover': {
		backgroundColor: 'white',
		color: 'black',
	},
	'&.selected': {
		backgroundColor: 'white',
	},
});

export const SelectAllContainerStyle = css({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: '10px',
	alignItems: 'center',
});

export const SelectMemberManagerContainerStyle = css({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: '10px',
	alignItems: 'center',
});
