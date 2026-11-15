import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Feiertag,
  FeiertagDto,
  FeiertagListeDto,
  FeiertagQueryDto,
} from './feiertag.dto';

@ApiTags('Feiertage')
@Controller('v1/feiertage')
export class FeiertageController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Feiertage',
    'Gesetzliche Feiertage in Baden-Württemberg 2026 und 2027, sortiert nach datum. Feiertage ändern sich nicht zwischen den Datenständen.',
    FeiertagListeDto,
  )
  findAll(@Query() query: FeiertagQueryDto) {
    const { seite, pro_seite, jahr } = query;
    return this.daten.liste<Feiertag>('feiertage', { jahr }, seite, pro_seite);
  }

  @Get(':datum')
  @EinzelEndpunkt(
    'Ein Feiertag',
    {
      name: 'datum',
      description: 'Tag des Feiertags (JJJJ-MM-TT)',
      example: '2026-12-25',
    },
    FeiertagDto,
    'FEIERTAG',
  )
  findOne(@Param('datum') nummer: string) {
    return this.daten.eins<Feiertag>('feiertage', nummer);
  }
}
