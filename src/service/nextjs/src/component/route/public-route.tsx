import { getCookie } from 'component/cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = (props: { element: JSX.Element }) => {
	const { element } = props;
	const userId = getCookie('userId');

	if (userId) {
		return <Navigate to="/main/info" replace={true} />;
	}
	return element;
};

export default PublicRoute;
