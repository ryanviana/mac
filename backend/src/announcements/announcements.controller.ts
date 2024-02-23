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
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './announcements.schema';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @ApiOperation({ summary: 'Create Announcement' })
  @ApiResponse({ status: 201, description: 'Announcement created.' })
  @ApiBody({ type: Announcement })
  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @ApiOperation({ summary: 'Get All Announcements' })
  @ApiResponse({ status: 200, description: 'All announcements returned.' })
  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @ApiOperation({ summary: 'Find Announcement by ID' })
  @ApiResponse({ status: 200, description: 'Announcement found.' })
  @ApiParam({ name: 'id', description: 'ID of the announcement' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Announcement' })
  @ApiResponse({ status: 200, description: 'Announcement updated.' })
  @ApiParam({ name: 'id', description: 'ID of the announcement to update' })
  @ApiBody({ type: Announcement })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(id, updateAnnouncementDto);
  }

  @ApiOperation({ summary: 'Delete Announcement' })
  @ApiResponse({ status: 200, description: 'Announcement deleted.' })
  @ApiParam({ name: 'id', description: 'ID of the announcement to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
