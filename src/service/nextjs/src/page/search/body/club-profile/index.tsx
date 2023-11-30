import React, { useEffect, useState } from 'react';
import SearchPageBodyClubProfileStyle from './index.style';
import axios from 'axios';
import { Club } from 'context/ClubContext';
import { BookmarkIcon } from 'page/search/header/icon';
import { DownArrowIcon } from 'page/Audit/body/icon';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<span>최신순</span>
			<DownArrowIcon width={15} height={10} />
		</div>
	);
};

const ClubProfileButton = (props: { club: Club }) => {
	const { club } = props;
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(`/main/search/${club._id}`);
			}}
		>
			<div></div>
			<div>
				<div>
					<span>{club.name}</span>
					<BookmarkIcon width={14} height={21} marked={false} />
				</div>
				<span>{club.introduction}</span>
			</div>
		</div>
	);
};

const SearchPageBodyClubProfile = () => {
	const [clubs, setClubs] = useState<Club[] | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/club`, { withCredentials: true })
			.then(response => {
				setClubs(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	if (!clubs || clubs.length === 0) {
		return null;
	}

	return (
		<div className={SearchPageBodyClubProfileStyle}>
			<Header />
			<div>
				<div>
					{clubs?.map((club, index) => {
						return <ClubProfileButton key={index} club={club} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchPageBodyClubProfile;
