import { Beer } from './beer.entity';

export class BeerDto {
  name: string;

  constructor(beer: Beer) {
    this.name = beer.name;
  }
}
