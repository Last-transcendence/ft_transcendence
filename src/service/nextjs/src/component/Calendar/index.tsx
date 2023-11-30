import React, { useRef, useEffect } from 'react';
import { DayCellContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.css'; // FullCalendar CSS
import { useNavigate } from 'react-router-dom';
import { dayNumberStyle, eventStyle, globalStyles, headerStyle } from './index.style';

interface CalendarProps {
	events: Event[];
}

interface Event {
	title: string;
	date: string;
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
	const calendarRef = useRef<FullCalendar>(null);

	const navigate = useNavigate();

	const handleAddEventClick = () => {
		// TODO: 이벤트 추가 로직을 여기에 구현
		navigate('/main/calendar/scheduler');
	};

	const customButtons = {
		myCustomButton: {
			text: '일정등록',
			click: handleAddEventClick,
		},
	};

	useEffect(() => {
		if (calendarRef.current) {
			calendarRef.current.getApi().addEventSource(events);
		}
	}, [events]);

	const renderDayCellContent = (e: DayCellContentArg) => {
		// "일" 문자를 제거
		const dayNumberText = e.dayNumberText.replace('일', '').trim();
		return { html: `<div class="day-number">${dayNumberText}</div>` };
	};

	return (
		<div className={globalStyles}>
			<FullCalendar
				titleFormat={{ month: 'long' }}
				ref={calendarRef}
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={events}
				dayCellContent={renderDayCellContent}
				dayCellClassNames={dayNumberStyle}
				customButtons={customButtons}
				buttonText={{
					today: '오늘날짜', // "Today" 버튼 텍스트를 한국어로 변경
				}}
				eventClassNames={eventStyle}
				dayHeaderClassNames={headerStyle}
				headerToolbar={{
					left: 'prev,next',
					center: 'title',
					right: 'today myCustomButton',
				}}
				locale="ko"
			/>
		</div>
	);
};

export default Calendar;
