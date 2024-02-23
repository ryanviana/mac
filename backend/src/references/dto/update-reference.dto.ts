import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceDto } from './create-reference.dto';

export class UpdateReferenceDto extends PartialType(CreateReferenceDto) {}
