import { PartialType } from '@nestjs/swagger';
import { Channel } from '../channel.dto';

export class PartialChannel extends PartialType(Channel) {}
