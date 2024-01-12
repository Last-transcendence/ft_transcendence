import { PartialType } from '@nestjs/swagger';
import Create from '../create';

class Update extends PartialType(Create) {}

export default Update;
