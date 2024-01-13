import { PartialType } from '@nestjs/swagger';
import { Create } from 'api/user/dto/request';

class Update extends PartialType(Create) {}

export default Update;
