import { ChatIcon, ParticipantIcon } from './icon';
import style from '../../../../style/main/body/chatting-room/index.module.css';

interface ChattingRoomProps {
	title: string;
	visibility: 'public' | 'protected' | 'private';
}

const RoomInformation = ({ title, visibility }: ChattingRoomProps) => {
	return (
		<div className={style.roomInformationContainer}>
			<div>
				<div>
					<span>{visibility}</span>
				</div>
			</div>
			<div>
				<span>{title}</span>
			</div>
		</div>
	);
};

const IconContainer = () => {
	return (
		<div className={style.iconContainer}>
			<ChatIcon width={'70cqh'} height={'70cqh'} />
		</div>
	);
};

const ChattingRoom = ({ title, visibility }: ChattingRoomProps) => {
	return (
		<div className={style.container}>
			<div>
				<RoomInformation title={title} visibility={visibility} />
				<IconContainer />
			</div>
		</div>
	);
};

export default ChattingRoom;
