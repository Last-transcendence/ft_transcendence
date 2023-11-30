import React from 'react';
import Calendar from '../../component/Calendar';
import styled from 'styled-components';
import { PageStyle } from '../page.style';
import NotificationCard from './Notification';
import BestParticipant from './best-participant';

const events = [
	{ title: '이벤트 1', date: '2023-09-23' },
	{ title: '이벤트 2', date: '2023-09-25' },
	// 더 많은 이벤트 추가
];

const Wrapper = styled.div`
	height: 789px;
	display: grid;
	grid-template-columns: 894px 282px;
	gap: 24px;
	align-items: center;
`;

const CalendarContainer = styled.div`
	height: 100%;
	border: 1px solid black;
	> div {
		margin: 10px 10px auto 10px;
	}
`;

const InfoContainer = styled.div`
	display: grid;
	grid-template-rows: 330px 437px;
	gap: 22px;
`;

const CalendarPage: React.FC = () => {
	return (
		<div className={PageStyle}>
			<Wrapper>
				<CalendarContainer>
					<Calendar events={events} />
				</CalendarContainer>
				<InfoContainer>
					<BestParticipant />
					<NotificationCard />
				</InfoContainer>
			</Wrapper>
		</div>
	);
};

export default CalendarPage;
