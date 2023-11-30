import React from 'react';
import SearchPageBodyStyle from './index.style';
import SearchPageBodyTag from './tag';
import SearchPageBodyClubProfile from './club-profile';

const SearchPageBody = () => {
	return (
		<div className={SearchPageBodyStyle}>
			<div>
				<SearchPageBodyTag />
				<SearchPageBodyClubProfile />
			</div>
		</div>
	);
};

export default SearchPageBody;
