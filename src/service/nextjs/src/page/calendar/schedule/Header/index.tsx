import React from 'react';
import { BackIcon, PencilIcon } from './icon';
import {
	BackAndInputTitleContainer,
	ScheduleHeaderContainer,
	ScheduleRegisterButtonStyle,
} from './index.style';
import { useNavigate } from 'react-router';

// < 버튼과 제목 입력창이 있는 컴포넌트를 하나의 div로 묶고, 등록 버튼을 또 하나의 컴포넌트로 해서 display: flex후 justify-content: space-between로 정렬
// align-items: center로 세로 정렬

// 버튼을 누르면 해당 페이지에 입력한 값들을 서버로 전송할 수 있는 버튼

export const ScheduleRegisterButton = (props: { onRegister: () => void }) => {
	const { onRegister } = props;

	return (
		<div className={ScheduleRegisterButtonStyle}>
			<PencilIcon width={19} height={19} />
			<button type="submit" onClick={onRegister}>
				등록
			</button>
		</div>
	);
};

const ScheduleHeader = (props: {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	onRegister: () => void;
}) => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate('/main/calendar');
	};

	const { setTitle, onRegister } = props;

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value); // 상위 컴포넌트의 상태도 업데이트
	};

	return (
		<div className={ScheduleHeaderContainer}>
			<div className={BackAndInputTitleContainer}>
				<BackIcon width={29} height={29} onClick={handleBack} />
				<input type="text" placeholder="일정명을 입력해주세요" onChange={handleTitleChange} />
			</div>
			<ScheduleRegisterButton onRegister={onRegister} />
		</div>
	);
};

export default ScheduleHeader;
