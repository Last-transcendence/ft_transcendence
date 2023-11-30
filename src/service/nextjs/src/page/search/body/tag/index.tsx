import React, { useRef } from 'react';
import SearchPageBodyTagStyle from './index.style';

const Tag = (props: { tag: string }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);

	return (
		<div>
			<input type="checkbox" ref={inputRef} />
			<label
				ref={labelRef}
				onMouseEnter={() => {
					if (labelRef.current) {
						inputRef.current?.checked === true
							? (labelRef.current.style.backgroundColor = '#F8F8F8')
							: (labelRef.current.style.backgroundColor = '#F8F8F8');
					}
				}}
				onMouseLeave={() => {
					if (labelRef.current) {
						inputRef.current?.checked === true
							? (labelRef.current.style.backgroundColor = 'white')
							: (labelRef.current.style.backgroundColor = 'transparent');
					}
				}}
				onMouseDown={() => {
					if (labelRef.current) {
						labelRef.current.style.backgroundColor = '#E5E5E5';
					}
				}}
				onClick={() => {
					if (inputRef.current) {
						inputRef.current.checked = !inputRef.current.checked;
					}
					if (labelRef.current) {
						labelRef.current.style.backgroundColor =
							inputRef.current?.checked === true ? 'white' : 'transparent';
					}
				}}
			>
				{props.tag}
			</label>
		</div>
	);
};

const SearchPageBodyTag = () => {
	return (
		<div className={SearchPageBodyTagStyle}>
			<Tag tag="전체" />
			<Tag tag="공부" />
			<Tag tag="음악" />
			<Tag tag="체육" />
			<Tag tag="미술" />
			<Tag tag="취미" />
			<Tag tag="기타" />
		</div>
	);
};

export default SearchPageBodyTag;
