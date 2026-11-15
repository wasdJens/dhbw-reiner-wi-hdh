import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { PAGE_SIZE, PageQueryDto } from '../page.dto';
import { BreweriesService } from './breweries.service';
import { BreweryDto, BreweryPageDto } from './dto/brewery.dto';

@ApiTags('v2')
@Controller('v2/brauereien')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Brauereien, seitenweise',
    description:
      `Liefert eine Seite mit höchstens ${PAGE_SIZE} Brauereien, sortiert nach brauerei_nr. ` +
      'seiten_gesamt nennt die Zahl aller Seiten; hinter der letzten Seite ist daten leer.',
  })
  @ZodResponse({
    status: 200,
    type: BreweryPageDto,
    description: 'Eine Seite der Brauereien',
  })
  @ApiBadRequestResponse({
    type: ErrorDto,
    description: 'seite ist keine ganze Zahl ab 1',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'API-Key fehlt oder ist ungültig',
  })
  findAll(@Query() query: PageQueryDto) {
    return this.breweriesService.findAll(query.seite);
  }

  @Get(':brauerei_nr')
  @ApiOperation({ summary: 'Eine Brauerei' })
  @ApiParam({
    name: 'brauerei_nr',
    description: 'Nummer der Brauerei',
    example: 'BRA-01',
  })
  @ZodResponse({ status: 200, type: BreweryDto, description: 'Die Brauerei' })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'API-Key fehlt oder ist ungültig',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Brauerei unbekannt' })
  findOne(@Param('brauerei_nr') breweryNumber: string) {
    return this.breweriesService.findOne(breweryNumber);
  }
}
