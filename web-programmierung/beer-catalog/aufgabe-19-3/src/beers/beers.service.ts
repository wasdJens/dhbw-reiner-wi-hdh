import { Injectable, NotFoundException } from '@nestjs/common';
import { BreweriesService } from '../breweries/breweries.service';
import { ErpClient } from '../erp/erp.client';
import { ImportReport } from '../import-report.dto';
import { toBeer } from './beer.mapper';
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
  async importFromErp(): Promise<ImportReport> {
    const report = { created: 0, updated: 0, unchanged: 0, skipped: 0 };
    const erpArticles = await this.erpClient.findArticles();

    for (const erpArticle of erpArticles) {
      const brewery = this.breweriesService.findByErpNumber(
        erpArticle.brauerei_nr,
      );
      if (!brewery) {
        report.skipped++;
        continue;
      }
      const data = toBeer(erpArticle, brewery.id);
      const beer = this.beers.find((b) => b.erpNumber === data.erpNumber);
      if (!beer) {
        this.beers.push({ id: this.nextId++, ...data });
        report.created++;
      } else if (
        beer.name !== data.name ||
        beer.style !== data.style ||
        beer.abv !== data.abv ||
        beer.price !== data.price ||
        beer.breweryId !== data.breweryId
      ) {
        Object.assign(beer, data);
        report.updated++;
      } else {
        report.unchanged++;
      }
    }
    return report;
  }
}
