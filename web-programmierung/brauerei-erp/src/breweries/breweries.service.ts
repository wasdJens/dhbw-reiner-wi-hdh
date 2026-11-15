import { Injectable, NotFoundException } from '@nestjs/common';
import { Page, toPage } from '../page.dto';
import { BREWERIES, Brewery } from './brewery';
import { BreweryOut } from './dto/brewery.dto';

@Injectable()
export class BreweriesService {
  findAll(page: number): Page<BreweryOut> {
    return toPage(BREWERIES.map(toBreweryOut), page);
  }

  findOne(breweryNumber: string): BreweryOut {
    const brewery = BREWERIES.find((b) => b.breweryNumber === breweryNumber);
    if (!brewery) {
      throw new NotFoundException({
        fehler: `Brauerei ${breweryNumber} unbekannt`,
        code: 'BRAUEREI_404',
      });
    }
    return toBreweryOut(brewery);
  }
}

function toBreweryOut(brewery: Brewery): BreweryOut {
  return {
    brauerei_nr: brewery.breweryNumber,
    name: brewery.name,
    ort: brewery.city,
    status: brewery.status,
    geaendert_am: brewery.changedAt,
  };
}
