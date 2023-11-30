import { Club } from 'context/ClubContext';
import React from 'react';
import SearchClubPageBodyStyle from './index.style';
import SearchClubPageDescription from './description';
import SearchClubPageReview from './review';

const SearchClubPageBody = (props: { club: Club }) => {
	const { club } = props;

	return (
		<div className={SearchClubPageBodyStyle}>
			<SearchClubPageDescription club={club} />
			<SearchClubPageReview clubId={club._id} />
		</div>
	);
};

export default SearchClubPageBody;
