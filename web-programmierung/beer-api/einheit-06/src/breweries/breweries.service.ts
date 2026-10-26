import { Injectable } from '@nestjs/common';

export interface Brewery {
  id: number;
  name: string;
  city: string;
  country: string;
}

@Injectable()
export class BreweriesService {
  // Daten im Arbeitsspeicher: Nach einem Neustart sind es wieder vier
  private readonly breweries: Brewery[] = [
    {
      id: 1,
      name: 'Privatbrauerei Schlumberger',
      city: 'Nattheim',
      country: 'Deutschland',
    },
    {
      id: 2,
      name: 'Wildbräu Grafing',
      city: 'Grafing bei München',
      country: 'Deutschland',
    },
    { id: 3, name: 'Augustiner-Bräu', city: 'München', country: 'Deutschland' },
    {
      id: 4,
      name: 'Edelweissbrauerei Farny',
      city: 'Kißlegg',
      country: 'Deutschland',
    },
  ];
  private nextId = 5;

  findAll(): Brewery[] {
    return this.breweries;
  }

  findOne(id: number): Brewery | undefined {
    return this.breweries.find((b) => b.id === id);
  }

  create(data: Omit<Brewery, 'id'>): Brewery {
    const brewery = { id: this.nextId++, ...data };
    this.breweries.push(brewery);
    return brewery;
  }
}
