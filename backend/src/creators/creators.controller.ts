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
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from './creators.schema';

@ApiTags('creators') // Groups all routes under 'creators' tag in Swagger UI
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @ApiOperation({ summary: 'Create a new creator' }) // Describes the operation
  @ApiResponse({
    status: 201,
    description: 'The creator has been successfully created.',
  }) // Describes the response
  @ApiBody({
    type: Creator,
    description: 'Data for creating a new creator',
  }) // Describes the request body
  @Post()
  create(@Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorsService.create(createCreatorDto);
  }

  @ApiOperation({ summary: 'Find all creators' })
  @ApiResponse({ status: 200, description: 'Returns an array of creators.' })
  @Get()
  findAll() {
    return this.creatorsService.findAll();
  }

  @ApiOperation({ summary: 'Find a creator by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single creator.' })
  @ApiParam({ name: 'id', description: 'ID of the creator to find' }) // Describes path parameters
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a creator' })
  @ApiResponse({
    status: 200,
    description: 'The creator has been successfully updated.',
  })
  @ApiParam({ name: 'id', description: 'ID of the creator to update' })
  @ApiBody({
    type: Creator,
    description: 'Data for updating a creator',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorsService.update(id, updateCreatorDto);
  }

  @ApiOperation({ summary: 'Delete a creator' })
  @ApiResponse({
    status: 200,
    description: 'The creator has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'ID of the creator to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorsService.remove(id);
  }
}
