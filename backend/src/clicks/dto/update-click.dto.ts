import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkDto } from './create-click.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {}
