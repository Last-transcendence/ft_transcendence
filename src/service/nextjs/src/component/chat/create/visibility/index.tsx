'use client';

import { Dispatch, SetStateAction } from 'react';
import style from '../../../../style/chat/create/visibility/index.module.css';
import { ChannelVisibility } from '@/type/channel.type';

interface ButtonProps {
	readonly name: string;
	readonly value: ChannelVisibility;
	visibility: ChannelVisibility;
	setVisibility: Dispatch<SetStateAction<ChannelVisibility>>;
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
	visibility: ChannelVisibility;
	setVisibility: Dispatch<SetStateAction<ChannelVisibility>>;
}

const CreateChatVisibility = ({ visibility, setVisibility }: CreateChatVisibilityProps) => {
	return (
		<div className={style.container}>
			<span>공개 범위</span>
			<div>
				<Button
					name="visibility"
					value={ChannelVisibility.PUBLIC}
					visibility={visibility}
					setVisibility={setVisibility}
				/>
				<Button
					name="visibility"
					value={ChannelVisibility.PROTECTED}
					visibility={visibility}
					setVisibility={setVisibility}
				/>
				<Button
					name="visibility"
					value={ChannelVisibility.PRIVATE}
					visibility={visibility}
					setVisibility={setVisibility}
				/>
			</div>
		</div>
	);
};

export default CreateChatVisibility;
