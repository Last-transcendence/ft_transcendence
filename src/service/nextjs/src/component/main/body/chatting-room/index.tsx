import { ChatIcon, ParticipantIcon } from './icon';
import style from '../../../../style/main/body/chatting-room/index.module.css';

interface ChattingRoomProps {
	title: string;
	visibility: 'public' | 'protected' | 'private';
	numberOfPeople: number;
}

const RoomInformation = ({ title, visibility, numberOfPeople }: ChattingRoomProps) => {
	return (
		<div className={style.roomInformationContainer}>
			<div>
				<div>
					<span>{visibility}</span>
				</div>
				<div>
					<ParticipantIcon width={25} height={16} />
					<span>{numberOfPeople}</span>
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

const ChattingRoom = ({ title, visibility, numberOfPeople }: ChattingRoomProps) => {
	return (
		<div className={style.container}>
			<div>
				<RoomInformation title={title} visibility={visibility} numberOfPeople={numberOfPeople} />
				<IconContainer />
			</div>
		</div>
	);
};

export default ChattingRoom;
