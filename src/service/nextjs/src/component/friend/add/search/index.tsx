'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import style from '../../../../style/friend/add/search/index.module.css';
import { SearchIcon } from './icon';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFriendProps {
	onSearch: (name: string) => void;
	isSearching: boolean;
	setIsSearching: Dispatch<SetStateAction<boolean>>;
}

const SearchFriend = ({ onSearch, isSearching, setIsSearching }: SearchFriendProps) => {
	const [text, setText] = useState('');

	return (
		<div className={style.container}>
			<input
				type="text"
				value={text}
				placeholder="친구 추가할 이름을 입력하세요."
				onChange={event => {
					setText(event.target.value);
					if (event.target.value === '') setIsSearching(false);
				}}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						onSearch(text);
					}
				}}
			/>
			{isSearching ? (
				<ClearIcon
					sx={{ fontSize: '22px' }}
					onClick={() => {
						setText('');
						setIsSearching(false);
					}}
				/>
			) : (
				<SearchIcon
					width="9"
					height="9"
					onClick={() => {
						onSearch(text);
					}}
				/>
			)}
		</div>
	);
};

export default SearchFriend;
