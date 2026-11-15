import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatenService } from '../daten/daten.service';
import { EinzelEndpunkt, ListenEndpunkt } from '../doku';
import {
  Artikel,
  ArtikelDto,
  ArtikelListeDto,
  ArtikelQueryDto,
} from './artikel.dto';

@ApiTags('Artikel')
@Controller('v1/artikel')
export class ArtikelController {
  constructor(private readonly daten: DatenService) {}

  @Get()
  @ListenEndpunkt(
    'Artikel',
    'Artikel des Einkaufskatalogs, sortiert nach artikel_nr. Filter sind kombinierbar.',
    ArtikelListeDto,
  )
  findAll(@Query() query: ArtikelQueryDto) {
    const { seite, pro_seite, geaendert_seit, ...felder } = query;
    return this.daten.liste<Artikel>(
      'artikel',
      { felder, geaendertSeit: geaendert_seit },
      seite,
      pro_seite,
    );
  }

  @Get(':artikel_nr')
  @EinzelEndpunkt(
    'Ein Artikel',
    { name: 'artikel_nr', description: 'Artikelnummer', example: 'ART-0001' },
    ArtikelDto,
    'ARTIKEL',
  )
  findOne(@Param('artikel_nr') nummer: string) {
    return this.daten.eins<Artikel>('artikel', nummer);
  }
}
