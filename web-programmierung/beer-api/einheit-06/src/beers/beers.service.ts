import { Injectable } from '@nestjs/common';

export interface Beer {
  id: number;
  name: string;
  style: string;
  abv: number;
  breweryId: number;
  description?: string;
}

@Injectable()
export class BeersService {
  // Daten im Arbeitsspeicher: Nach einem Neustart sind es wieder vier
  private readonly beers: Beer[] = [
    {
      id: 1,
      name: 'Nattheimer Spezial',
      style: 'spezial',
      abv: 5.4,
      breweryId: 1,
    },
    {
      id: 2,
      name: 'Wildbräu Grafing Helles',
      style: 'helles',
      abv: 5.0,
      breweryId: 2,
    },
    {
      id: 3,
      name: 'Augustiner Lagerbier Hell',
      style: 'helles',
      abv: 5.2,
      breweryId: 3,
    },
    {
      id: 4,
      name: 'Farny Kristall-Weizen',
      style: 'weizen',
      abv: 5.3,
      breweryId: 4,
    },
  ];
  private nextId = 5;

  findAll(style?: string): Beer[] {
    // Ohne ?style= liefert der Endpunkt alle Biere
    if (style) {
      return this.beers.filter((beer) => beer.style === style);
    }
    return this.beers;
  }

  findOne(id: number): Beer | undefined {
    return this.beers.find((b) => b.id === id);
  }

  create(data: Omit<Beer, 'id'>): Beer {
    const beer = { id: this.nextId++, ...data };
    this.beers.push(beer);
    return beer;
  }

  remove(id: number): void {
    // splice ändert das Array, das findAll liest
    const index = this.beers.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.beers.splice(index, 1);
    }
  }
}
