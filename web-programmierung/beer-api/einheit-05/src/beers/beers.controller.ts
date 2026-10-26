import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

interface Beer {
  id: number;
  name: string;
  style: string;
  abv: number;
  breweryId: number;
  description?: string;
}

const beers: Beer[] = [
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

@Controller('beers')
export class BeersController {
  @Get()
  findAll(@Query('style') style?: string): Beer[] {
    // Ohne ?style= liefert der Endpunkt alle Biere
    if (style) {
      return beers.filter((beer) => beer.style === style);
    }
    return beers;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Beer {
    const beer = beers.find((b) => b.id === Number(id));
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }
}
