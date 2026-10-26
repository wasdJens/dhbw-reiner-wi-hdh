import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

interface Brewery {
  id: number;
  name: string;
  city: string;
  country: string;
}

// Feste Liste; ab Einheit 6 liegen die Daten im Service
const breweries: Brewery[] = [
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

@Controller('breweries')
export class BreweriesController {
  @Get()
  findAll(): Brewery[] {
    return breweries;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Brewery {
    // Pfadparameter kommen immer als String an
    const brewery = breweries.find((b) => b.id === Number(id));
    if (!brewery) {
      throw new NotFoundException(`Brewery ${id} not found`);
    }
    return brewery;
  }
}
