import React, { Dispatch, SetStateAction, useContext } from 'react';
import { LogoutButtonIcon } from './icon';
import { LogoutButtonStyle } from './index.style';
import { AuthContext } from 'context/AuthContext';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { removeCookie } from 'component/cookie';

const LogoutButton = (props: { setIsClicked: Dispatch<SetStateAction<boolean>> }) => {
	const { setIsClicked } = props;
	const { setMe } = useContext(AuthContext);
	const navigate = useNavigate();
	const logout = async (navigate: NavigateFunction) => {
		await axios
			.delete(`${process.env.REACT_APP_NESTJS_URL}/auth/signout`, { withCredentials: true })
			.then(() => {
				setIsClicked(false);
				setMe(null);
				removeCookie('userId', { path: '/' });
				removeCookie('clubId', { path: '/' });
				navigate('/');
			})
			.catch(error => {
				alert(error.response.data.message);
			});
	};

	return (
		<div
			onClick={() => {
				logout(navigate);
			}}
			className={LogoutButtonStyle}
		>
			<LogoutButtonIcon width={40} height={40} />
		</div>
	);
};

export default LogoutButton;
