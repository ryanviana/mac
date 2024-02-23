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
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './tokens.schema';

@ApiTags('tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokenService: TokensService) {}

  @ApiOperation({ summary: 'Create Token' })
  @ApiResponse({ status: 201, description: 'Token created.' })
  @ApiBody({ type: Token })
  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @ApiOperation({ summary: 'Get All Tokens' })
  @ApiResponse({ status: 200, description: 'All tokens returned.' })
  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @ApiOperation({ summary: 'Find Token by ID' })
  @ApiResponse({ status: 200, description: 'Token found.' })
  @ApiParam({ name: 'id', description: 'ID of the token' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Token' })
  @ApiResponse({ status: 200, description: 'Token updated.' })
  @ApiParam({ name: 'id', description: 'ID of the token to update' })
  @ApiBody({ type: Token })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(id, updateTokenDto);
  }

  @ApiOperation({ summary: 'Delete Token' })
  @ApiResponse({ status: 200, description: 'Token deleted.' })
  @ApiParam({ name: 'id', description: 'ID of the token to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}
