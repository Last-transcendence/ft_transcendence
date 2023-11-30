import React, { useState } from 'react';
import SearchPageHeaderStyle from './index.style';
import { BookmarkIcon, SearchIcon } from './icon';

const Bookmark = () => {
	return (
		<div>
			<BookmarkIcon width={15} height={21} marked={true} />
			<span>북마크 목록</span>
		</div>
	);
};

const SearchBox = () => {
	const [searchWord, setSearchWord] = useState<string | undefined>(undefined);

	return (
		<div>
			<form
				onSubmit={event => {
					event.preventDefault();
					console.log(searchWord);
				}}
			>
				<input
					type="text"
					placeholder="검색어를 입력해주세요."
					value={searchWord}
					onChange={event => setSearchWord(event.target.value)}
				/>
				<button type="submit">
					<SearchIcon width={32} height={32} />
				</button>
			</form>
		</div>
	);
};

const SearchPageHeader = () => {
	return (
		<div className={SearchPageHeaderStyle}>
			<Bookmark />
			<SearchBox />
		</div>
	);
};

export default SearchPageHeader;
