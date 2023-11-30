import React, { useContext } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { PageStyle } from 'page/page.style';
import ScheduleHeader from './Header';
import ScheduleBody from './Body';
import { ClubContext } from 'context/ClubContext';
import { Types } from 'mongoose';

import axios from 'axios';
const Wrapper = styled.div`
	height: 1479px;
	width: 1200px;
	gap: 24px;
	align-items: center;
	border: 1px solid black;
`;

const SchedulerPage: React.FC = () => {
	// 최상위 부모 컴포넌트에서 관리하는데 일단은 모든 컴포넌트 만들어지면 하기..

	const [title, setTitle] = React.useState<string>('');
	// const [startDate, setStartDate] = React.useState<Date>(new Date());
	const [startDate, setStartDate] = React.useState<Date | null>(new Date());
	const [endDate, setEndDate] = React.useState<Date | null>(new Date());
	const [description, setDescription] = React.useState<string>('');
	const [feeAmount, setFeeAmount] = React.useState<number>(0);
	const [attendances, setAttendances] = React.useState<Types.ObjectId[]>([]);
	console.log(setStartDate, setEndDate, setDescription, setFeeAmount, setAttendances);

	const { club } = useContext(ClubContext);

	const handleRegister = async () => {
		const data = {
			title,
			startDate,
			endDate,
			description,
			feeAmount,
			attendances,
		};

		try {
			await axios.post(`${process.env.REACT_APP_NESTJS_URL}/club/${club?._id}/schedule`, data, {
				withCredentials: true,
			});
			console.log('Data sent successfully');
		} catch (error) {
			console.error('Error sending data:', error);
		}
	};

	// ScheduleHeader에 setTitle, onRegister={handleRegister}를 props로 넘겨줘야 함
	// ScheduleBody에 setStartDate, setEndDate, setDescription, setFeeAmount, setAttendances를 props로 넘겨줘야함
	return (
		<div className={PageStyle}>
			<Wrapper>
				<ScheduleHeader setTitle={setTitle} onRegister={handleRegister} />
				<ScheduleBody
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setAttendances={setAttendances}
					setDescription={setDescription}
					setFeeAmount={setFeeAmount}
				/>
			</Wrapper>
		</div>
	);
};

export default SchedulerPage;
