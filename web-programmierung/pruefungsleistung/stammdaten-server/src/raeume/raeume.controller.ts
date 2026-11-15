import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import { Raum, RaumDto, RaumListeDto, RaumQueryDto } from './raum.dto';

@ApiTags('Räume')
@Controller('v1/raeume')
export class RaeumeController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Räume',
    'Räume aller Standorte, sortiert nach raum_nr. Filter sind kombinierbar.',
    RaumListeDto,
  )
  findAll(@Query() query: RaumQueryDto) {
    const { seite, pro_seite, geaendert_seit, ...felder } = query;
    return this.daten.liste<Raum>(
      'raeume',
      { felder, geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':raum_nr')
  @EinzelEndpunkt(
    'Ein Raum',
    { name: 'raum_nr', description: 'Nummer des Raums', example: 'RAU-001' },
    RaumDto,
    'RAUM',
    true,
  )
  findOne(@Param('raum_nr') nummer: string) {
    return this.daten.eins<Raum>('raeume', nummer);
  }
}
