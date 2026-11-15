import { Controller, Get, Header, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { ArticlesService } from './articles.service';
import { StockV1Dto } from './dto/stock-v1.dto';

@ApiTags('v1 (abgekündigt)')
@Controller('v1/artikel')
export class StockV1Controller {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':artikel_nr/bestand')
  // Abgekündigt seit 01.01.2027 (RFC 9745), abgeschaltet ab 01.01.2028 (RFC 8594)
  @Header('Deprecation', '@1798761600')
  @Header('Sunset', 'Sat, 01 Jan 2028 00:00:00 GMT')
  @Header('Link', '</api>; rel="deprecation"')
  @ApiOperation({
    summary: 'Bestand eines Artikels (v1, abgekündigt)',
    description:
      'Liefert den Bestand als Summe aller Lagerorte. Abgekündigt seit 01.01.2027 ' +
      '(Header Deprecation), abgeschaltet ab 01.01.2028 (Header Sunset). Nutze v2.',
    deprecated: true,
  })
  @ApiParam({
    name: 'artikel_nr',
    description: 'Artikelnummer',
    example: 'BR-1001',
  })
  // Über @ZodResponse: ersetzt dessen Eintrag in Swagger um die Header
  @ApiOkResponse({
    type: StockV1Dto.Output,
    description: 'Bestand des Artikels',
    headers: {
      Deprecation: {
        description: 'Zeitpunkt der Abkündigung (RFC 9745)',
        schema: { type: 'string', example: '@1798761600' },
      },
      Sunset: {
        description: 'Zeitpunkt der Abschaltung (RFC 8594)',
        schema: { type: 'string', example: 'Sat, 01 Jan 2028 00:00:00 GMT' },
      },
      Link: {
        description: 'Verweis auf die Dokumentation der Abkündigung',
        schema: { type: 'string', example: '</api>; rel="deprecation"' },
      },
    },
  })
  @ZodResponse({ status: 200, type: StockV1Dto })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'API-Key fehlt oder ist ungültig',
  })
  @ApiNotFoundResponse({ type: ErrorDto, description: 'Artikel unbekannt' })
  findStock(@Param('artikel_nr') articleNumber: string) {
    return this.articlesService.findStockV1(articleNumber);
  }
}
