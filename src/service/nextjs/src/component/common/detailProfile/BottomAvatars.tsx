import { Grid, Box } from '@mui/material';
import NewIcon, { NewIconProps } from '../../profile/common/NewIcon';

interface bottomAvatarsType {
	avatars: NewIconProps[];
}

const BottomAvatarsGrid = ({ avatars }: bottomAvatarsType) => (
	<Grid container justifyContent="space-between">
		{avatars.map((avatar, index) => (
			<Grid item key={index} xs={3}>
				<Box textAlign="center">
					<NewIcon {...avatar} />
				</Box>
			</Grid>
		))}
	</Grid>
);

export default BottomAvatarsGrid;
