import { PartialType } from '@nestjs/swagger';
import CreateHistory from '../create-history';

class UpdateHistory extends PartialType(CreateHistory) {}

export default UpdateHistory;
