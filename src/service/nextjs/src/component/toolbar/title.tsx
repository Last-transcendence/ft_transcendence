import React, { useContext } from 'react';
import { User } from 'context/AuthContext';
import { ToolBarTitleStyle } from './title.style';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo_rec.svg';
import { ClubContext } from 'context/ClubContext';

const ToolBarTitle = (props: { me: User | null }) => {
	const { me } = props;
	const { club } = useContext(ClubContext);
	const route = me ? '/main/info' : '/';

	return (
		<div className={ToolBarTitleStyle}>
			<Link to={route}>
				<Logo width={120} height={30} />
			</Link>
			<span>|</span>
			<span>{club ? club.name : '국민대'}</span>
		</div>
	);
};

export default ToolBarTitle;
