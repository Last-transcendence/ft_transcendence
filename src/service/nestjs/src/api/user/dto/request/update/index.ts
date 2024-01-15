import { PartialType } from '@nestjs/swagger';
import { Create } from '../../request';

class Update extends PartialType(Create) {}

export default Update;
