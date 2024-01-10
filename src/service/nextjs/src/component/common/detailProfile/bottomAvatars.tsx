import { Grid, Box } from '@mui/material';
import NewIcon, { NewIconProps } from '../../profile/common/newIcon';

interface bottomAvatarsType {
	avatars: NewIconProps[];
}

const BottomAvatarsGrid = ({ avatars }: bottomAvatarsType) => (
	<Grid container justifyContent="space-around">
		{avatars.map((avatar, index) => (
			<Grid item key={index} xs={4}>
				<Box textAlign="center">
					<NewIcon {...avatar} />
				</Box>
			</Grid>
		))}
	</Grid>
);

export default BottomAvatarsGrid;
