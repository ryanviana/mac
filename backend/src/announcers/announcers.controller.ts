import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AnnouncersService } from './announcers.service';
import { CreateAnnouncerDto } from './dto/create-announcer.dto';
import { UpdateAnnouncerDto } from './dto/update-announcer.dto';
import { Announcer } from './announcers.schema';

@ApiTags('announcers')
@Controller('announcers')
export class AnnouncersController {
  constructor(private readonly announcersService: AnnouncersService) {}

  @ApiOperation({ summary: 'Create Announcer' })
  @ApiResponse({ status: 201, description: 'Announcer created.' })
  @ApiBody({ type: Announcer })
  @Post()
  create(@Body() createAnnouncerDto: CreateAnnouncerDto) {
    return this.announcersService.create(createAnnouncerDto);
  }

  @ApiOperation({ summary: 'Get All Announcers' })
  @ApiResponse({ status: 200, description: 'All announcers returned.' })
  @Get()
  findAll() {
    return this.announcersService.findAll();
  }

  @ApiOperation({ summary: 'Find Announcer by ID' })
  @ApiResponse({ status: 200, description: 'Announcer found.' })
  @ApiParam({ name: 'id', description: 'ID of the announcer' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Announcer' })
  @ApiResponse({ status: 200, description: 'Announcer updated.' })
  @ApiParam({ name: 'id', description: 'ID of the announcer to update' })
  @ApiBody({ type: Announcer })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnouncerDto: UpdateAnnouncerDto,
  ) {
    return this.announcersService.update(id, updateAnnouncerDto);
  }

  @ApiOperation({ summary: 'Delete Announcer' })
  @ApiResponse({ status: 200, description: 'Announcer deleted.' })
  @ApiParam({ name: 'id', description: 'ID of the announcer to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcersService.remove(id);
  }
}
