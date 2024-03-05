import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CounterService } from './counter.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Post()
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.counterService.create(createCounterDto);
  }

  @Get()
  findAll() {
    return this.counterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto) {
    return this.counterService.update(id, updateCounterDto);
  }
}
