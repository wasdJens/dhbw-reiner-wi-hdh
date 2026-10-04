import { Injectable } from '@nestjs/common';
import { Beer } from './beer.entity';
import { BeerDto } from './beer.dto';

@Injectable()
export class BeersService {
  private readonly beers: Beer[] = [];

  create(newBeer: BeerDto) {
    const beer = new Beer(newBeer);

    this.beers.push(beer);

    return new BeerDto(beer);
  }

  findAll() {
    return this.beers.map((beer) => new BeerDto(beer));
  }
}
