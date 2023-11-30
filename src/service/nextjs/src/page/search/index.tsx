import React from 'react';
import { SearchPageStyle } from './index.style';
import SearchPageHeader from './header';
import SearchPageBody from './body';

const SearchPage = () => {
	return (
		<div className={SearchPageStyle}>
			<SearchPageHeader />
			<SearchPageBody />
		</div>
	);
};

export default SearchPage;
