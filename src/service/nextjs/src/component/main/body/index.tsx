import style from '../../../style/main/body/index.module.css';
import ChattingRoom from './chatting-room';

const MainPageBody = () => {
	// TODO: State 관리 그냥 "use client" 쓰고 해도 되나요?,, NextJS best practice가 무엇인지 모르겠네요.
	return (
		<div className={style.container}>
			<div>
				<div>
					<span>일반 채팅</span>
					<span>1:1 채팅</span>
				</div>
				<div>
					<ChattingRoom title="Mockup data 1" visibility="public" numberOfPeople={1} />
					<ChattingRoom title="Mockup data 2" visibility="protected" numberOfPeople={2} />
					<ChattingRoom title="Mockup data 3" visibility="protected" numberOfPeople={3} />
				</div>
			</div>
		</div>
	);
};

export default MainPageBody;
