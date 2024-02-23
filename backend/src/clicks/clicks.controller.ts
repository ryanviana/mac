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
import { ClicksService } from './clicks.service';
import { CreateLinkDto as CreateClickDto } from './dto/create-click.dto';
import { UpdateLinkDto as UpdateClickDto } from './dto/update-click.dto';
import { CountClickRequestDto } from './dto/count-click-request-dto';
import { CheckIpAlreadyClicked } from './dto/check-click-already-clicked-dto';
import { Click } from './clicks.schema';

@ApiTags('clicks') // Swagger tag for all routes in this controller.
@Controller('clicks')
export class ClicksController {
  constructor(private readonly clicksService: ClicksService) {}

  @ApiOperation({ summary: 'Find all clicks' }) // Swagger operation description.
  @ApiResponse({ status: 200, description: 'Return all clicks.' }) // Swagger response description.
  @Get()
  findAll() {
    return this.clicksService.findAll();
  }

  @ApiOperation({ summary: 'Find a click by ID' })
  @ApiResponse({ status: 200, description: 'Return a single click.' })
  @ApiParam({ name: 'id', description: 'ID of the click to find' }) // Swagger parameter description.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clicksService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new click' })
  @ApiResponse({ status: 201, description: 'The click has been created.' })
  @ApiBody({ type: Click, description: 'Data for creating a click' }) // Swagger body description.
  @Post()
  create(@Body() createClickDto: CreateClickDto) {
    return this.clicksService.create(createClickDto);
  }

  @ApiOperation({ summary: 'Check if an IP has already clicked' })
  @ApiResponse({
    status: 200,
    description: 'Returns whether the IP has already clicked.',
  })
  @ApiBody({
    type: CheckIpAlreadyClicked,
    description: 'IP and reference to check',
  })
  @Post('/ip-already-clicked')
  async ipAlreadyClicked(@Body() checkIpAlreadyClicked: CheckIpAlreadyClicked) {
    return await this.clicksService.checkIfIpAlreadyClicked(
      checkIpAlreadyClicked.ip,
      checkIpAlreadyClicked.reference,
    );
  }

  @ApiOperation({
    summary: 'Check if there are at least a thousand unpaid clicks',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns true if there are at least a thousand unpaid clicks.',
  })
  @ApiBody({
    type: CountClickRequestDto,
    description: 'Reference to check for unpaid clicks',
  })
  @Post('/unpaid')
  async hasAtLeastThousandUnpaidClicks(
    @Body() countClickRequestDto: CountClickRequestDto,
  ) {
    return await this.clicksService.hasAtLeastThousandUnpaidClicks(
      countClickRequestDto.reference,
    );
  }

  @ApiOperation({ summary: 'Mark all clicks as paid' })
  @ApiResponse({ status: 200, description: 'Marks all clicks as paid.' })
  @Patch('/reset-unpaid-count')
  async markAllClicksAsPaid() {
    return await this.clicksService.markAllClicksAsPaid();
  }

  @ApiOperation({ summary: 'Update a click' })
  @ApiResponse({ status: 200, description: 'The click has been updated.' })
  @ApiParam({ name: 'id', description: 'ID of the click to update' })
  @ApiBody({ type: Click, description: 'Data for updating a click' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClickDto: UpdateClickDto) {
    return this.clicksService.update(id, updateClickDto);
  }

  @ApiOperation({ summary: 'Delete a click' })
  @ApiResponse({ status: 200, description: 'The click has been deleted.' })
  @ApiParam({ name: 'id', description: 'ID of the click to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clicksService.remove(id);
  }

  @ApiOperation({ summary: 'Get click count by proposalId' })
  @ApiResponse({ status: 200, description: 'Return click count.' })
  @Get('/count/:proposalId')
  countClicks(@Param('proposalId') proposalId: number) {
    return this.clicksService.countClicksByProposalId(proposalId);
  }
}
