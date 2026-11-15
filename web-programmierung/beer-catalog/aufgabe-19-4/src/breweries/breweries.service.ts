import { Injectable, NotFoundException } from '@nestjs/common';
import { ErpClient } from '../erp/erp.client';
import { ImportReport } from '../import-report.dto';
import { toBrewery } from './brewery.mapper';
import { Brewery } from './dto/brewery.dto';
import { UpdateBreweryDto } from './dto/update-brewery.dto';

@Injectable()
export class BreweriesService {
  // Daten im Arbeitsspeicher: Nach dem Start ist der Katalog leer
  private readonly breweries: Brewery[] = [];
  private nextId = 1;

  constructor(private readonly erpClient: ErpClient) {}

  findAll(): Brewery[] {
    return this.breweries;
  }

  findOne(id: number): Brewery {
    const brewery = this.breweries.find((b) => b.id === id);
    if (!brewery) {
      throw new NotFoundException(`Brewery ${id} not found`);
    }
    return brewery;
  }

  // undefined: Die Brauerei ist nicht im Katalog (nicht importiert oder gesperrt)
  findByErpNumber(erpNumber: string): Brewery | undefined {
    return this.breweries.find((b) => b.erpNumber === erpNumber);
  }

  update(id: number, dto: UpdateBreweryDto): Brewery {
    return Object.assign(this.findOne(id), dto);
  }

  // Regeln des Imports:
  // 1. Das ERP ist führend. Ein zweiter Import legt nichts doppelt an und
  //    überschreibt lokale Änderungen.
  // 2. Die Wiedererkennung läuft über die Nummer aus dem ERP (erpNumber).
  //    Die eigene id vergibt der Katalog.
  // 3. Gesperrte Brauereien werden nicht übernommen.
  // 4. Ergebnis ist ein Bericht { created, updated, unchanged, skipped }.
  async importFromErp(): Promise<ImportReport> {
    const report = { created: 0, updated: 0, unchanged: 0, skipped: 0 };
    // Alle Seiten; ERP nicht erreichbar → 503, ungültige Antwort → 502
    const erpBreweries = await this.erpClient.findBreweries();

    for (const erpBrewery of erpBreweries) {
      // Regel 3
      if (erpBrewery.status === 'gesperrt') {
        report.skipped++;
        continue;
      }
      // Ab hier nur noch Felder des Katalogs
      const data = toBrewery(erpBrewery);
      // Regel 2
      const brewery = this.findByErpNumber(data.erpNumber);
      if (!brewery) {
        this.breweries.push({ id: this.nextId++, ...data });
        report.created++;
      } else if (brewery.name !== data.name || brewery.city !== data.city) {
        // Regel 1: Die Daten des ERP überschreiben lokale Änderungen
        Object.assign(brewery, data);
        report.updated++;
      } else {
        report.unchanged++;
      }
    }
    // Regel 4
    return report;
  }
}
