import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatorDto } from './create-creator.dto';

export class UpdateCreatorDto extends PartialType(CreateCreatorDto) {}
