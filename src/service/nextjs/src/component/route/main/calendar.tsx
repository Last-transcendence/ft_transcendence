import CalendarPage from 'page/calendar';
import SchedulerPage from 'page/calendar/schedule';
import React, { Route, Routes } from 'react-router-dom';

const CalendarRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<CalendarPage />} />
			<Route path="/scheduler" element={<SchedulerPage />} />
		</Routes>
	);
};

export default CalendarRoute;
