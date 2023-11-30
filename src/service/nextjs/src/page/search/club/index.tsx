import React, { useEffect, useState } from 'react';
import { Club } from 'context/ClubContext';
import axios from 'axios';
import ClubSearchPageStyle from './index.style';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { BackwardIcon } from './icon';
import SearchClubPageBody from './body';

const Header = (props: { clubName: string; navigate: NavigateFunction }) => {
	const { clubName, navigate } = props;
	const handleClick = () => {
		navigate('/main/search');
	};

	return (
		<div>
			<BackwardIcon width={30} height={30} onClick={handleClick} />
			<span>{clubName}</span>
		</div>
	);
};

const ClubSearchPage = () => {
	const location = useLocation();
	const clubId = location.pathname.split('/').pop() as string;
	const [club, setClub] = useState<Club | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (clubId) {
			axios
				.get(`${process.env.REACT_APP_NESTJS_URL}/club/${clubId}`, { withCredentials: true })
				.then(response => {
					setClub(response.data);
				})
				.catch(() => {
					alert('잘못된 접근입니다.');
					navigate('/main/search');
				});
		}
	}, []);

	if (!club) {
		return null;
	}

	return (
		<div className={ClubSearchPageStyle}>
			<Header clubName={club.name} navigate={navigate} />
			<SearchClubPageBody club={club} />
		</div>
	);
};

export default ClubSearchPage;
