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
import { ReferencesService } from './references.service';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { CheckLinkByReferenceDto } from './dto/check-link-by-reference.dto';
import { Reference } from './references.schema';

@ApiTags('references')
@Controller('references')
export class ReferencesController {
  constructor(private readonly referenceService: ReferencesService) {}

  @ApiOperation({ summary: 'Create Reference' })
  @ApiResponse({ status: 201, description: 'Reference created.' })
  @ApiBody({ type: Reference })
  @Post()
  create(@Body() createReferenceDto: CreateReferenceDto) {
    return this.referenceService.create(createReferenceDto);
  }

  @ApiOperation({ summary: 'Get All References' })
  @ApiResponse({ status: 200, description: 'All references returned.' })
  @Get()
  findAll() {
    return this.referenceService.findAll();
  }

  @ApiOperation({ summary: 'Get Link by Reference' })
  @ApiResponse({
    status: 200,
    description: 'Link returned for given reference.',
  })
  @ApiBody({ type: CheckLinkByReferenceDto })
  @Post('/get-link-by-reference')
  getLinkByReference(@Body() checkLinkByReferenceDto: CheckLinkByReferenceDto) {
    return this.referenceService.getLinkByReference(
      checkLinkByReferenceDto.reference,
    );
  }

  @ApiOperation({ summary: 'Find Reference by ID' })
  @ApiResponse({ status: 200, description: 'Reference found.' })
  @ApiParam({ name: 'id', description: 'ID of the reference' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenceService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Reference' })
  @ApiResponse({ status: 200, description: 'Reference updated.' })
  @ApiParam({ name: 'id', description: 'ID of the reference to update' })
  @ApiBody({ type: Reference })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenceDto: UpdateReferenceDto,
  ) {
    return this.referenceService.update(id, updateReferenceDto);
  }

  @ApiOperation({ summary: 'Delete Reference' })
  @ApiResponse({ status: 200, description: 'Reference deleted.' })
  @ApiParam({ name: 'id', description: 'ID of the reference to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenceService.remove(id);
  }

  @ApiOperation({ summary: 'Get Active References' })
  @ApiResponse({ status: 200, description: 'All active references returned.' })
  @Get('/active')
  getActiveReferences() {
    return this.referenceService.getActiveReferences();
  }

  @ApiOperation({ summary: 'Check if Reference Exists' })
  @ApiResponse({ status: 200, description: 'Reference exists.' })
  @ApiParam({ name: 'reference', description: 'Reference to check' })
  @Get('/check-reference-exists/:reference')
  checkReferenceExists(@Param('reference') reference: string) {
    return this.referenceService.checkReferenceExists(reference);
  }

  @ApiOperation({ summary: 'Get ID by Reference' })
  @ApiResponse({ status: 200, description: 'ID returned for given reference.' })
  @ApiParam({ name: 'reference', description: 'Reference to get ID for' })
  @Get('/get-id-by-reference/:reference')
  getIdByReference(@Param('reference') reference: string) {
    return this.referenceService.getReferenceByReference(reference);
  }
}
