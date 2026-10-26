import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreweryDto } from './dto/create-brewery.dto';

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

  findOne(id: number): Brewery {
    const brewery = this.breweries.find((b) => b.id === id);
    if (!brewery) {
      // Jeder Aufrufer bekommt dieselbe 404
      throw new NotFoundException(`Brewery ${id} not found`);
    }
    return brewery;
  }

  create(dto: CreateBreweryDto): Brewery {
    const brewery = { id: this.nextId++, ...dto };
    this.breweries.push(brewery);
    return brewery;
  }

  remove(id: number): Brewery {
    const brewery = this.findOne(id);
    this.breweries.splice(this.breweries.indexOf(brewery), 1);
    return brewery;
  }
}
