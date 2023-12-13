import { ChatIcon, PeopleIcon } from './icon';
import style from '../../../../style/main/body/chatting-room/index.module.css';

interface ChattingRoomProps {
	title: string;
	visibility: 'public' | 'protected' | 'private';
	numberOfPeople: number;
}

const RoomInformation = ({ title, visibility, numberOfPeople }: ChattingRoomProps) => {
	return (
		<div className={style.roomInformation}>
			<div>
				<div>
					<span>{visibility}</span>
				</div>
				<div>
					<PeopleIcon width={25} height={16} />
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
		<div>
			<ChatIcon width={47} height={47} />
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
