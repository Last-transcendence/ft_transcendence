import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface ModifyIDProps {
	value: string;
	onChange: (value: string) => void;
}

const ModifyID = ({ value, onChange }: ModifyIDProps) => {
	return (
		<TextField
			label="닉네임"
			variant="outlined"
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
		/>
	);
};

export default ModifyID;
