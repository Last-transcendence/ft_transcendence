import React from 'react';
import MyPageParticipateStyle from './index.style';
import { User } from 'context/AuthContext';
import { HandIcon, RightArrowIcon } from './icon';

const Header = () => {
	return (
		<div>
			<HandIcon width={29} height={29} />
			<span>참여 활동</span>
		</div>
	);
};

const Participation = (props: { me: User }) => {
	const { me } = props;
	const ratio = 0.65;
	const message = ['요즘 너무 바쁜거 같아요..', '평균 보다 더 많이 참여했어요!'];
	const progressBar = {
		width: `${ratio * 100}%`,
		height: '100%',
		backgroundColor: '#D9D9D9',
	};

	return (
		<div>
			<div>
				<span>참여도 {ratio * 100}%</span>
				<span>{0.5 < ratio ? message[1] : message[0]}</span>
			</div>
			<div>
				<div style={progressBar}></div>
			</div>
		</div>
	);
	<>{me}</>;
};

const Activity = (props: { me: User }) => {
	const { me } = props;
	const date = '09-30';

	return (
		<div>
			<div>{date}</div>
			<div>참여 활동</div>
			<RightArrowIcon
				width={12}
				height={20}
				onClick={() => {
					alert('업데이트 예정입니다!');
				}}
			/>
		</div>
	);
	<>{me}</>;
};

const Participated = (props: { me: User }) => {
	const { me } = props;

	return (
		<div>
			<div>
				<Activity me={me} />
				<Activity me={me} />
				<Activity me={me} />
				<Activity me={me} />
				<Activity me={me} />
				<Activity me={me} />
				<Activity me={me} />
			</div>
		</div>
	);
};

const MyPageParticipate = (props: { me: User }) => {
	const { me } = props;

	return (
		<div className={MyPageParticipateStyle}>
			<Header />
			<div>
				<Participation me={me} />
				<Participated me={me} />
			</div>
		</div>
	);
};

export default MyPageParticipate;
