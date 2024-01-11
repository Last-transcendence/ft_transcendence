import { PartialType } from '@nestjs/swagger';
import { Create } from 'api/user/dto/request';

export class UpdateChannel extends PartialType(Create) {}
