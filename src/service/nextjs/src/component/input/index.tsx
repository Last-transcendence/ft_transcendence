import { RefObject } from '@fullcalendar/core/preact';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

const handleInputChange = (
	event: ChangeEvent<HTMLInputElement>,
	setValue: Dispatch<SetStateAction<string | undefined>>,
) => {
	setValue(event.target.value);
};

const CustomInput = (props: {
	type: string | undefined;
	label: string | undefined;
	value: string | undefined;
	setValue: Dispatch<SetStateAction<string | undefined>>;
	inputRef?: RefObject<HTMLInputElement> | undefined;
	className?: string | undefined;
	onChange?: (
		event: ChangeEvent<HTMLInputElement>,
		setValue: Dispatch<SetStateAction<string | undefined>>,
	) => void;
	onFocus?: () => void;
	onBlur?: () => void;
}) => {
	const {
		label,
		value,
		setValue,
		inputRef = undefined,
		className = undefined,
		onChange = handleInputChange,
		onFocus = undefined,
		onBlur = undefined,
	} = props;
	const type = props.type || 'text';

	return (
		<div className={className}>
			<input
				ref={inputRef}
				type={type}
				placeholder={label}
				value={value}
				onChange={event => onChange(event, setValue)}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default CustomInput;
