import React, { ChangeEvent } from 'react';
import { TextField, Typography, TypographyProps, InputProps } from '@mui/material';

export interface customTextFieldProps {
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	typographyProps?: TypographyProps;
}

const CustomTextField = ({ label, value, onChange, typographyProps }: customTextFieldProps) => {
	return (
		<>
			{typographyProps && <Typography {...typographyProps}>{label}</Typography>}
			<TextField
				id="outlined-basic"
				label={label}
				variant="outlined"
				fullWidth
				required
				inputProps={{ maxLength: 10, minLength: 3 }}
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

export default CustomTextField;
