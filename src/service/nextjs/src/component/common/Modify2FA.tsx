import { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel, TextField, Box } from '@mui/material';

export interface ModifyTwoFactorProps {
	checked: boolean;
	onToggle: () => void;
	email: string;
	onEmailChange: (value: string) => void;
}

const Modify2FA = ({ checked, onToggle, email, onEmailChange }: ModifyTwoFactorProps) => {
	return (
		<Box display="flex" flexDirection="column" justifyItems="center" marginTop={5}>
			<FormControlLabel
				control={<Checkbox checked={checked} onChange={onToggle} />}
				label="이차 인증 사용"
			/>
			{checked && (
				<TextField
					label="이차 인증 이메일"
					variant="outlined"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onEmailChange(e.target.value)}
					fullWidth
				/>
			)}
		</Box>
	);
};

export default Modify2FA;
