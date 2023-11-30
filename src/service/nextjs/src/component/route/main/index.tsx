import AuditPage from 'page/Audit';
import InfoPage from 'page/Info';
import React, { Route, Routes } from 'react-router-dom';
import MyPage from 'page/my';
import SearchRoute from './search';
import CalendarRoute from './calendar';

const MainRoute = () => {
	return (
		<Routes>
			<Route path="/info" element={<InfoPage />} />
			<Route path="/calendar/*" element={<CalendarRoute />} />
			<Route path="/audit" element={<AuditPage />} />
			<Route path="/search/*" element={<SearchRoute />} />
			<Route path="/mypage" element={<MyPage />} />
		</Routes>
	);
};

export default MainRoute;
