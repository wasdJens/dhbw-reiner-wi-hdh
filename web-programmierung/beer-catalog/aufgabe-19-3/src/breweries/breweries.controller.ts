import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { ImportReportDto } from '../import-report.dto';
import { BreweriesService } from './breweries.service';
import { BreweryDto } from './dto/brewery.dto';
import { UpdateBreweryDto } from './dto/update-brewery.dto';

@ApiTags('breweries')
@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Get()
  @ZodResponse({ status: 200, type: [BreweryDto] })
  findAll() {
    return this.breweriesService.findAll();
  }

  @Get(':id')
  @ZodResponse({ status: 200, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.breweriesService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse({ status: 200, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBreweryDto) {
    return this.breweriesService.update(id, dto);
  }

  // Übernimmt die Brauereien aus dem ERP; 200, weil der Import keine
  // einzelne Ressource anlegt, sondern einen Bericht liefert
  @Post('import')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ status: 200, type: ImportReportDto })
  @ApiBadGatewayResponse({ type: ErrorDto })
  @ApiServiceUnavailableResponse({ type: ErrorDto })
  importFromErp() {
    return this.breweriesService.importFromErp();
  }
}
