import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { ArticlesService } from './articles.service';
import { StockV2Dto } from './dto/stock-v2.dto';

@ApiTags('v2')
@Controller('v2/artikel')
export class StockV2Controller {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':artikel_nr/bestand')
  @ApiOperation({
    summary: 'Bestand eines Artikels je Lagerort',
    description:
      'Liefert den Bestand je Lagerort und den Zeitpunkt der letzten Inventur nach ISO 8601. ' +
      'Die Summe über alle Lagerorte bildet der Client.',
  })
  @ApiParam({
    name: 'artikel_nr',
    description: 'Artikelnummer',
    example: 'BR-1001',
  })
  @ZodResponse({
    status: 200,
    type: StockV2Dto,
    description: 'Bestand des Artikels je Lagerort',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'API-Key fehlt oder ist ungültig',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Artikel unbekannt' })
  findStock(@Param('artikel_nr') articleNumber: string) {
    return this.articlesService.findStockV2(articleNumber);
  }
}
