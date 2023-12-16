'use client';

import { useState } from 'react';
import style from '../../../../style/friend/add/search/index.module.css';
import { SearchIcon } from './icon';

const SearchFriend = () => {
	const [name, setName] = useState<string>('');

	return (
		<div className={style.container}>
			<input
				type="text"
				value={name}
				placeholder="친구 추가할 이름을 입력하세요."
				onChange={event => setName(event.target.value)}
			/>
			<SearchIcon
				width="9"
				height="9"
				onClick={() => {
					alert(name);
				}}
			/>
		</div>
	);
};

export default SearchFriend;
