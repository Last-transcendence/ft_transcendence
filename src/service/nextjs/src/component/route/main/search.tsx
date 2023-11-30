import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route';
import SearchPage from 'page/search';
import ClubSearchPage from 'page/search/club';
import RegisterReviewClubSearchPage from 'page/search/club/review/register';

const SearchRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<PrivateRoute element={<SearchPage />} />} />
			<Route path="/:clubId" element={<PrivateRoute element={<ClubSearchPage />} />} />
			<Route
				path="/:clubId/review/register"
				element={<PrivateRoute element={<RegisterReviewClubSearchPage />} />}
			/>
		</Routes>
	);
};

export default SearchRoute;
