import { PartialType } from '@nestjs/swagger';
import { CreateCounterDto } from './create-counter.dto';

export class UpdateCounterDto extends PartialType(CreateCounterDto) {}
