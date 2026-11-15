import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Standort,
  StandortDto,
  StandortListeDto,
  StandortQueryDto,
} from './standort.dto';

@ApiTags('Standorte')
@Controller('v1/standorte')
export class StandorteController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Standorte',
    'Standorte mit Adresse, sortiert nach standort_nr.',
    StandortListeDto,
  )
  findAll(@Query() query: StandortQueryDto) {
    const { seite, pro_seite, geaendert_seit } = query;
    return this.daten.liste<Standort>(
      'standorte',
      { geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':standort_nr')
  @EinzelEndpunkt(
    'Ein Standort',
    {
      name: 'standort_nr',
      description: 'Nummer des Standorts',
      example: 'STO-01',
    },
    StandortDto,
    'STANDORT',
  )
  findOne(@Param('standort_nr') nummer: string) {
    return this.daten.eins<Standort>('standorte', nummer);
  }
}
