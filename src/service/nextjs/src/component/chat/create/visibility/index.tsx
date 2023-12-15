'use client';

import { Dispatch, SetStateAction } from 'react';
import style from '../../../../style/chat/create/visibility/index.module.css';
import { Visibility } from '@/pages/chat/create';

interface ButtonProps {
	readonly name: string;
	readonly value: Visibility;
	visibility: Visibility;
	setVisibility: Dispatch<SetStateAction<Visibility>>;
}

const Button = ({ name, value, visibility, setVisibility }: ButtonProps) => {
	return (
		<div onClick={() => setVisibility(value)}>
			<input
				type="radio"
				name={name}
				value={value}
				onChange={() => {}}
				checked={visibility === value}
			/>
			<label>{value}</label>
		</div>
	);
};

interface CreateChatVisibilityProps {
	visibility: Visibility;
	setVisibility: Dispatch<SetStateAction<Visibility>>;
}

const CreateChatVisibility = ({ visibility, setVisibility }: CreateChatVisibilityProps) => {
	return (
		<div className={style.container}>
			<span>공개 범위</span>
			<div>
				<Button
					name="visibility"
					value="public"
					visibility={visibility}
					setVisibility={setVisibility}
				/>
				<Button
					name="visibility"
					value="protected"
					visibility={visibility}
					setVisibility={setVisibility}
				/>
				<Button
					name="visibility"
					value="private"
					visibility={visibility}
					setVisibility={setVisibility}
				/>
			</div>
		</div>
	);
};

export default CreateChatVisibility;
