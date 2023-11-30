import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'page/auth/login';
import RegisterPage from 'page/auth/register';
import FormRegisterPage from 'page/auth/register/form';

const AuthRoute = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/register/form" element={<FormRegisterPage />} />
		</Routes>
	);
};

export default AuthRoute;
