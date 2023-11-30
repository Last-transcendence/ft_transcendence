import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../cookie';

const PrivateRoute = (props: { element: JSX.Element }) => {
	const { element } = props;
	const userId = getCookie('userId');
	const clubId = getCookie('clubId');

	if (!userId) {
		return <Navigate to="/auth/login" replace={true} />;
	}
	if (!clubId) {
		return <Navigate to="/main/search" replace={true} />;
	}
	return element;
};

export default PrivateRoute;
