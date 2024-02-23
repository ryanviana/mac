import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncerDto } from './create-announcer.dto';

export class UpdateAnnouncerDto extends PartialType(CreateAnnouncerDto) {}
