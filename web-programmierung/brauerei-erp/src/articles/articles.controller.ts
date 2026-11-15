import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { PAGE_SIZE } from '../page.dto';
import { ArticlesService } from './articles.service';
import { ArticlePageDto, ArticleQueryDto } from './dto/article.dto';

@ApiTags('v2')
@Controller('v2/artikel')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({
    summary: 'Artikel, seitenweise',
    description:
      `Liefert eine Seite mit höchstens ${PAGE_SIZE} Artikeln, sortiert nach artikel_nr. ` +
      'Mit brauerei_nr nur die Artikel dieser Brauerei. Den Bestand liefert ' +
      'GET /v2/artikel/{artikel_nr}/bestand.',
  })
  @ZodResponse({
    status: 200,
    type: ArticlePageDto,
    description: 'Eine Seite der Artikel',
  })
  @ApiBadRequestResponse({
    type: ErrorDto,
    description: 'seite ist keine ganze Zahl ab 1',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'API-Key fehlt oder ist ungültig',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: 'Brauerei aus brauerei_nr unbekannt',
  })
  findAll(@Query() query: ArticleQueryDto) {
    return this.articlesService.findAll(query.seite, query.brauerei_nr);
  }
}
