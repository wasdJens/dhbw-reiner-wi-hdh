import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { BreweriesService } from '../breweries/breweries.service';
import { ErpClient } from '../erp/erp.client';
import { ImportReport } from '../import-report.dto';
import { Beer } from './dto/beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@Injectable()
export class BeersService {
  // Daten im Arbeitsspeicher: Nach dem Start ist der Katalog leer
  private readonly beers: Beer[] = [];
  private nextId = 1;

  constructor(
    private readonly erpClient: ErpClient,
    private readonly breweriesService: BreweriesService,
  ) {}

  findAll(): Beer[] {
    return this.beers;
  }

  findOne(id: number): Beer {
    const beer = this.beers.find((b) => b.id === id);
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  update(id: number, dto: UpdateBeerDto): Beer {
    return Object.assign(this.findOne(id), dto);
  }

  // Regeln wie beim Import der Brauereien; Regel 3 hier: Artikel einer
  // Brauerei, die nicht im Katalog ist, werden nicht übernommen
  //
  // TODO Aufgabe 19.3, nach BreweriesService.importFromErp():
  // 1. src/erp/erp.schemas.ts: Schema des Artikels
  // 2. src/erp/erp.client.ts: findArticles()
  // 3. src/beers/beer.mapper.ts: toBeer()
  // 4. hier: alle Artikel lesen; je Artikel die Brauerei mit
  //    breweriesService.findByErpNumber() suchen (fehlt sie: skipped), das
  //    Bier an seiner erpNumber wiedererkennen (created, updated, unchanged)
  //    und den Bericht zurückgeben. Danach wird die Methode async
  importFromErp(): Promise<ImportReport> {
    throw new NotImplementedException(
      'POST /beers/import is not implemented yet: see TODO in src/beers/beers.service.ts',
    );
  }
}
