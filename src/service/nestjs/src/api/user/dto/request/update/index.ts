import { PartialType } from '@nestjs/swagger';
import Create from '../create';

class UpdateUser extends PartialType(Create) {}

export default UpdateUser;
