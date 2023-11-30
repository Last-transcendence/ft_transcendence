import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PreviewPage from '../page/PreviewPage';
import ToolBar from '../component/toolbar';
import './font.css';
import PrivateRoute from 'component/route/private-route';
import AuthRoute from 'component/route/auth';
import MainRoute from 'component/route/main';
import PublicRoute from 'component/route/public-route';

function App() {
	return (
		<div style={{ backgroundColor: '#EFEEEA' }}>
			<ToastContainer />
			<ToolBar />
			<Routes>
				<Route path="/" element={<PreviewPage />} />
				<Route path="/auth/*" element={<PublicRoute element={<AuthRoute />} />} />
				<Route path="/main/*" element={<PrivateRoute element={<MainRoute />} />} />
			</Routes>
		</div>
	);
}

export default App;
