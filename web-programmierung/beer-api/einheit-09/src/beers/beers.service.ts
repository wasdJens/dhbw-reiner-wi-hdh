import { Injectable, NotFoundException } from '@nestjs/common';
import { BreweriesService } from '../breweries/breweries.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

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
  constructor(private readonly breweriesService: BreweriesService) {}

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

  findOne(id: number): Beer {
    const beer = this.beers.find((b) => b.id === id);
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  findByBrewery(breweryId: number): Beer[] {
    return this.beers.filter((beer) => beer.breweryId === breweryId);
  }

  create(dto: CreateBeerDto): Beer {
    // R2: findOne wirft 404, wenn die Brauerei fehlt. 404 statt 400,
    // weil die Anfrage gültig ist und nur die Brauerei nicht existiert
    this.breweriesService.findOne(dto.breweryId);
    const beer = { id: this.nextId++, ...dto };
    this.beers.push(beer);
    return beer;
  }

  update(id: number, dto: UpdateBeerDto): Beer {
    const beer = this.findOne(id);
    // R2 auch beim Ändern, bevor ein Feld überschrieben wird
    if (dto.breweryId !== undefined) {
      this.breweriesService.findOne(dto.breweryId);
    }
    // Nur die Felder aus dem Body überschreiben
    Object.assign(beer, dto);
    return beer;
  }

  remove(id: number): void {
    // findOne wirft die 404, bevor etwas entfernt wird
    const beer = this.findOne(id);
    // splice ändert das Array, das findAll liest
    this.beers.splice(this.beers.indexOf(beer), 1);
  }
}
