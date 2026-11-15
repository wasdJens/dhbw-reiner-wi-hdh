import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Abteilung,
  AbteilungDto,
  AbteilungListeDto,
  AbteilungQueryDto,
} from './abteilung.dto';

@ApiTags('Abteilungen')
@Controller('v1/abteilungen')
export class AbteilungenController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Abteilungen',
    'Abteilungen mit Kostenstelle und Leitung, sortiert nach abteilung_nr.',
    AbteilungListeDto,
  )
  findAll(@Query() query: AbteilungQueryDto) {
    const { seite, pro_seite, geaendert_seit } = query;
    return this.daten.liste<Abteilung>(
      'abteilungen',
      { geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':abteilung_nr')
  @EinzelEndpunkt(
    'Eine Abteilung',
    {
      name: 'abteilung_nr',
      description: 'Nummer der Abteilung',
      example: 'ABT-06',
    },
    AbteilungDto,
    'ABTEILUNG',
  )
  findOne(@Param('abteilung_nr') nummer: string) {
    return this.daten.eins<Abteilung>('abteilungen', nummer);
  }
}
