import { PartialType } from '@nestjs/swagger';
import { Channel } from '..';

export class PartialChannel extends PartialType(Channel) {}
