import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Inventar,
  InventarDto,
  InventarListeDto,
  InventarQueryDto,
} from './inventar.dto';

@ApiTags('Inventar')
@Controller('v1/inventar')
export class InventarController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Inventar',
    'Geräte mit Seriennummer, Standort und verantwortlicher Person, sortiert nach inventar_nr. Filter sind kombinierbar.',
    InventarListeDto,
  )
  findAll(@Query() query: InventarQueryDto) {
    const { seite, pro_seite, geaendert_seit, ...felder } = query;
    return this.daten.liste<Inventar>(
      'inventar',
      { felder, geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':inventar_nr')
  @EinzelEndpunkt(
    'Eine Inventar-Position',
    { name: 'inventar_nr', description: 'Inventarnummer', example: 'INV-0003' },
    InventarDto,
    'INVENTAR',
  )
  findOne(@Param('inventar_nr') nummer: string) {
    return this.daten.eins<Inventar>('inventar', nummer);
  }
}
